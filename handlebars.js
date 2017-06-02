var console = require('./lib/console')
var handlebars = require('handlebars')
var dw = require('dungeonworld-data')
var mdlogBuilder = require('mdlog');
var mdlog = mdlogBuilder()
var helpers = dw.helpers
var colors = require('colors');

//Overwrite
helpers.push(function (hbars, data) {
  hbars.registerHelper('move')
})

//Register the helper functions with our handlebars
helpers.forEach(function (helper) {
  helper(handlebars, dw.rawData)
})

//Overwrite the 'move' helper from dungeonworld-data with our own
//This one return the name, plus the number of words in the move's description (more or less) in paranthese
//and also put the relevant stat if it has one
handlebars.registerHelper('move', function (key) {
  var move = dw.rawData.moves[key]
  var name = move.name
  var descWords = move.description.trim().split(/\s+/).length;
  var match = move.description.match(/roll\+([a-z]+)/i)
  var stat = '';
  if(match && match[1]) {
    stat = (' +' + match[1].toUpperCase() + '')
  }
  return move.name.cyan + colors.bold(stat)+ '' + (' (' + descWords + ' words)').italic.gray;
})


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