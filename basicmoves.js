var dw = require('dungeonworld-data')
var console = require('./lib/console')
var {elipses} = require('./lib/helpers');

var basicData = dw.basicData
console.h1("Basic Moves")
basicData.basic_moves.forEach((move) => {
  console.move(move)
  if(move.explanation) {
    console.label('Explanation', elipses(move.explanation, 100))
  }
})
