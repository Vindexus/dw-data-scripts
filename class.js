var dw = require('dungeonworld-data')
var console = require('./console')

var cname = process.argv[2]

if(!cname || cname.length == 0) {
  var classKeys = Object.keys(dw.basicData.classes)
  cname = classKeys[Math.floor(Math.random()*classKeys.length)];
  console.log(("Picking random class:  " + cname + " ").bgMagenta)
}

var cls = dw.basicData.classes[cname]

console.header(cls.name)
console.log(cls.description.substr(0, 50) + '...')

//Display some basic stats
console.hr2()
console.label("Base HP", cls.base_hp)
console.label("Base Load", cls.load)
console.log("Look".yellow + " " + "choose one from each".gray)
cls.looks.forEach(function (looks, i) {
  console.log("  %s", looks.join(", "))
})

//List their races and moves
if(cls.race_moves && cls.race_moves.length) {
  console.log("Race Options".yellow)
  cls.race_moves.forEach(function (rm) {
    console.log("   %s, %s", rm.name, rm.description.gray)
  })
}

//List out their potential alignments
console.log(console.yellow("Alignments"))
if(cls.alignments_list && cls.alignments_list.length > 0) {
  cls.alignments_list.forEach(function (alignment) { 
    console.log("   %s: %s", alignment.name, alignment.description.gray)
  })
}
else {
  console.log(cls.name + ' has no alignments'.red)
}

//Let's combine all the class's moves into one array
var moveLists = ['starting_moves', 'advanced_moves_1', 'advanced_moves_2']
var classMoves = []
for(var i = 0; i < moveLists.length; i++) {
  var key = moveLists[i]
  var moves = cls[key]
  if(!moves) {
    continue
  }
  classMoves = classMoves.concat(moves)
}

console.label("Num Moves", classMoves.length)

//Search through all of their starting and advanced moves
//to see if they have "multiclass_dabbler" anywhere
//and print out the result
var dabblerLevel = 0
var dabblerMoves = ['multiclass_dabbler', 'multiclass_initiate', 'multiclass_master']
for(var j = 0; j < classMoves.length; j++) {
  if(dabblerMoves.indexOf(classMoves[j].key) >= 0) {
    dabblerLevel++
  }
}
var status = "no".red
if(dabblerLevel >= 1) {
  status = "YES".green
}

if(dabblerLevel > 1) {
  status += " " + ("(x" + dabblerLevel + ")").bold
}
console.label("Multiclass Dabbler?", status)

//Count all moves that mention "Parley"
//This would be more accurate if you used the raw game data and searched for "{{move 'parley'}}" instead of through the basic data
//which will have replaced that string with straight text. Thus, this method will count moves that have the word "Parley" in them
//but aren't actually referencing that specific basic move. (I'm not sure such a thing even exists though)
var parleyMoves = classMoves.reduce(function (num, move) {
  if(move.description.indexOf('Parley') >= 0) {
    num++
  }
  return num
}, 0)
console.label("Parley Moves", parleyMoves)

var hnsMoves = classMoves.reduce(function (num, move) {
  if(move.description.indexOf('Hack & Slash') >= 0) {
    num++
  }
  return num
}, 0)
console.label("Hack & Slash Moves", hnsMoves)