/*
This takes the moves from the Dungeon World Data, and queries and displays it in different ways.
*/
var dw = require('dungeonworld-data')
var console = require('./lib/console')

//Get the parsed data, which replaces "{{tag 'near'}}" with "near"
var basicData = dw.basicData

//The data doesn't currently have a list of all moves, so I'm creating it here
var moves = []
var moveKeys = Object.keys(basicData.moves)
moveKeys.sort()
moves = moveKeys.filter(function (k) {
  return k !== undefined
}).map(function (k) {
  return basicData.moves[k]
}).filter(function (move) {
  return move != null && typeof(move) != 'string';
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
console.log(console.white(longestDesc.name) + " @ " + console.red(longestDesc.description.length) + " characters")
console.move(longestDesc);

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

console.header("some moves that can be replaced")
var numShown = 0;
for(var key in replaceableMoves) {
  var rm = replaceableMoves[key]
  numShown++;
  console.log(rm.move.name.bold + ' is replaceable by ' + rm.replacedBy.map(function (m) { return m.name.bold }).join(" and "))
  if(numShown > 10) {
    break;
  }
}
