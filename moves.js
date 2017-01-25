/*
This takes the moves from the Dungeon World Data, and queries and displays it in different ways.
*/
var dw = require('dungeonworld-data')
var console = require('./console')

//Get the parsed data, which replaces "{{tag 'near'}}" with "near"
var basicData = dw.basicData

//The data doesn't currently have a list of all moves, so I'm creating it here
var moves = []
var moveKeys = Object.keys(basicData.moves)
moveKeys.sort()
moves = moveKeys.map(function (k) {
  return basicData.moves[k]
})

var movesByDescLen = moves.sort(function (a, b) {
  var al = a.description.length
  var bl = b.description.length
  if(al == bl) {
    return 0
  }
  return al > bl ? 1 : -1
})

var shortestDescription = movesByDescLen[0]
var longestDesc = movesByDescLen[movesByDescLen.length-1]

console.header("move with the shortest description")
console.log(console.white(shortestDescription.name) + " @ " + console.green(shortestDescription.description.length) + " characters\n" + console.gray(shortestDescription.description))

console.header("move with the longest description")
console.log(console.white(longestDesc.name) + " @ " + console.red(longestDesc.description.length) + " characters\n " + console.gray(longestDesc.description))

//==================================================================
// Find all the moves the have the "replaces" key, that point to another move
var replaceableMoves = moves.reduce(function (atlas, move) {
  if(move.hasOwnProperty('replaces')) {
    if(!atlas.hasOwnProperty(move.replaces)) {
      var replaces = basicData.moves[move.replaces]
      atlas[move.replaces] = {
        move: replaces,
        replacedBy: []
      }
    }
    atlas[move.replaces].replacedBy.push(move)
  }
  return atlas
}, {})

console.header("moves that can be replaced")
for(var key in replaceableMoves) {
  var rm = replaceableMoves[key]
  console.log(rm.move.name + ' is replaceable by: ' + rm.replacedBy.map(function (m) { return m.name }).join(", "))
}