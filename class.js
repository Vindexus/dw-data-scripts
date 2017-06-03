var dw = require('dungeonworld-data')
var console = require('./lib/console')
var helpers = require('./lib/helpers');

var elipses = helpers.elipses;
var rightpad = helpers.rightpad;

var cname = process.argv[2]

if(!cname || cname.length == 0) {
  var classKeys = Object.keys(dw.basicData.classes)
  cname = classKeys[Math.floor(Math.random()*classKeys.length)];
  console.log(("Picking random class:  " + cname + " ").bgMagenta)
}


console.log(Object.keys(dw.basicData))

var cls = dw.basicData.classes[cname]

//Let's combine all the class's moves into one array
var moveLists = ['starting_moves', 'race_moves', 'advanced_moves_1', 'advanced_moves_2']
var classMoves = []
for(var i = 0; i < moveLists.length; i++) {
  var key = moveLists[i]
  var moves = cls[key]
  if(!moves) {
    continue
  }
  classMoves = classMoves.concat(moves)
}


console.header(cls.name)
console.log(elipses(cls.description, 80))

//Display some basic stats
console.hr2()
console.labeldots("Base HP", cls.base_hp)
console.labeldots("Damage", cls.damage)
console.labeldots("Base Load", cls.load)
console.labeldots("Total Moves", classMoves.length)
console.labeldots("Race Moves", cls.race_moves.length);
console.labeldots("Starting Moves", cls.starting_moves.length);
console.labeldots("Level 2-5 Moves", cls.advanced_moves_1.length);
console.labeldots("Level 6-10 Moves", cls.advanced_moves_2.length);

//Search through all of their starting and advanced moves
//to see if they have "multiclass_dabbler" anywhere
//and print out the result
var dabblerLevel = 0
var dabblerMoves = ['multiclass_dabbler', 'multiclass_initiate', 'multiclass_master', 'special_trick']
for(var j = 0; j < classMoves.length; j++) {
  if(dabblerMoves.indexOf(classMoves[j].key) >= 0) {
    dabblerLevel++
  }
}
console.labeldots("Multiclass Moves", dabblerLevel)

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
console.labeldots("Parley Moves", parleyMoves)

var hnsMoves = classMoves.reduce(function (num, move) {
  if(move.description.indexOf('Hack & Slash') >= 0) {
    num++
  }
  return num
}, 0)
console.labeldots("Hack & Slash Moves", hnsMoves)

console.log("Look".red + " " + "choose one from each".gray)
cls.looks.forEach(function (looks, i) {
  console.log("   %s", looks.join(", "))
})

//List their races and moves
if(cls.race_moves && cls.race_moves.length) {
  console.log("Race".cyan)
  cls.race_moves.forEach(function (rm) {
    console.log("   %s: %s", rm.name, elipses(rm.description, 80 - rm.name.length - 6).gray)
  })
}

//List their possible names
if(cls.names) {
  console.log("Names".green)
  for(var race in cls.names) {
    console.log("   %s: %s", race.toUpperCase().substr(0,1) + race.substr(1), cls.names[race].join(', ').gray)
  }
}

//List out their potential alignments
console.log(console.magenta("Alignments"))
if(cls.alignments_list && cls.alignments_list.length > 0) {
  cls.alignments_list.forEach(function (alignment) { 
    console.log("   %s: %s", alignment.name, alignment.description.gray)
  })
}
else {
  console.log(cls.name + ' has no alignments'.red)
}


console.h2("STARTING MOVES")
cls.starting_moves.forEach((move) => {
  console.log(rightpad(move.name, 20, '.'), elipses(move.description, 59).gray);
});

console.h2("GEAR CHOICES")
cls.gear_choices.forEach(function (gc) {
  console.log(gc.label.bold);
  console.log(gc.list.map(function (choice) {
    return " - " + choice
  }).join("\n"));
})