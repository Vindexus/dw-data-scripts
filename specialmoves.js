var dw = require('dungeonworld-data')
var console = require('./lib/console')

var basicData = dw.basicData
console.h1("Special Moves")
basicData.special_moves.forEach(function (move, index) {
  if(move) {
    console.move(move)
  }
  else {
    console.log("move not found at index %s".red, index)
  }
})
