var console = require('./console')
var handlebars = require('handlebars')
var dw = require('dungeonworld-data')
var mdlogBuilder = require('mdlog');
var mdlog = mdlogBuilder()


var helpers = dw.helpers

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
handlebars.registerHelper('move', function (key) {
  var move = dw.rawData.moves[key]
  var name = move.name
  var descWords = move.description.trim().split(/\s+/).length;
  return move.name + (' _(' + descWords + ' words)_').gray
})


//Loop through some example moves and output them after running through our handlebars compiler
var toDisplay = ['smash', 'healing_song', 'bamboozle']
toDisplay.forEach(function (key) {
  var move = dw.rawData.moves[key]
  var description = handlebars.compile(move.description, {noEscape: true})(dw.rawData) //Run the description through handlebars

  console.hr2()
  console.log((move.name.bold))
  console.md(description)
})