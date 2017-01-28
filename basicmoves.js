var dw = require('dungeonworld-data')
var console = require('./console')

var basicData = dw.basicData
console.h1("Basic Moves")
basicData.basic_moves.forEach(console.move)
