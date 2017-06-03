var console = require('./lib/console')
var handlebars = require('handlebars')
var dw = require('dungeonworld-data')
var mdlogBuilder = require('mdlog');
var mdlog = mdlogBuilder()
var helpers = dw.helpers
var colors = require('colors');


//Overwrite the 'move' helper from dungeonworld-data with our own
//This one return the name, plus the number of words in the move's description (more or less) in paranthese
//and also put the relevant stat if it has one
helpers.move = function (key) {
  var move = dw.rawData.moves[key]
  var name = move.name
  var descWords = move.description.trim().split(/\s+/).length; //Count the words
  var match = move.description.match(/roll\+([a-z]+)/i) //Find roll+INT and roll+Cha text to find the stat
  var stat = '';
  if(match && match[1]) {
    stat = (' +' + match[1].toUpperCase() + '')
  }
  return move.name.cyan + colors.bold(stat)+ '' + (' (' + descWords + ' words)').italic.gray;
}

//Override the default item helper to make the tags color
var redTags = ['precise', 'piercing'];
helpers.item = function (param) {
 var item = helpers.getItem(param);

 //Here we go through all the tags and add some color to it
 //giving certain tags a red color and the rest gray
 return item.name + ' (' + item.tags.map(function (t) {
  var tag = helpers.getTag(t);
  if(redTags.indexOf(tag.key) >= 0) {
    return helpers.tag(t).red
  }
  return helpers.tag(t).gray
 }).join(', ') + ')'
}

//Register all these helpers with Handlebars
for(var key in helpers) {
  handlebars.registerHelper(key, helpers[key]);
}

//Loop through some example moves and output them after running through our handlebars compiler
var toDisplay = ['duelists_parry', 'evasion', 'bamboozle', 'ranger_human']
console.h1('Moves that reference other moves');
toDisplay.forEach(function (key) {
  var move = dw.rawData.moves[key]
  var description = handlebars.compile(move.description, {noEscape: true})(dw.rawData) //Run the description through handlebars

  console.hr2()
  console.log((move.name.green.bold) + ' ' + key.gray)
  console.md(description)
})

console.h1("Some sample items");
var items = ['chainmail', 'vorpal_sword', 'dungeon_rations', 'short_sword', 'dueling_rapier'];
items.forEach(function (key) {
  //Log the result of doing {{item 'chainmail'}} through handlebars with our custom helpers
  //and the base DungeonWorldData helpers. This one is just an example of the item one.
  console.log(handlebars.compile("{{item '" + key + "'}}", {noEscape: true})(dw.rawData));
})