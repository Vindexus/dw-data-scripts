var mdlogBuilder = require('mdlog');
var mdlog = mdlogBuilder({
  "code": {
    "color": "black"
  },
  "inlineCode": {
    "color": "black",
    "background": "white"
  },
  "link": {
    "color": "magenta"
  },
  "image": {
    "color": "cyan"
  }
})

var colors = require('colors')
colors.width = 40

colors.hr1 = function () {
  console.log(colors.yellow("=".repeat(colors.width)))
}

colors.hr2 = function () {
  console.log(colors.white("-".repeat(colors.width)))
}

colors.hr3 = function () {
  console.log(colors.gray(".".repeat(colors.width)))
}

colors.header = function (msg) {
  colors.hr1()
  console.log(colors.bold(msg.toUpperCase()))
  colors.hr1()
}

colors.h1 = colors.header

colors.h2 = function (msg) {
  colors.hr2()
  colors.log(msg.bold)
}

colors.labeldots = function (lbl, msg, width) {
  width = width || 30
  width -= msg.toString().length
  if(lbl.length > width) {
    lbl = lbl.substr(0, width);
  }
  var dots = Math.max(width - lbl.length, 0);
  console.log(lbl.yellow + ('.'.repeat(dots).gray) + msg);
}

colors.label = function (lbl, msg) {
  console.log(colors.yellow(lbl), msg)
}

colors.move = function (move) {
  colors.hr2()
  console.log(move.name.bold)
  if(move.replaces) {
    console.log(("Replaces: " + move.replaces).italic)
  }
  if(move.requires) {
    console.log(("Requires: " + move.replaces).italic)
  }
  console.log(move.description.gray)
}

colors.log = console.log

colors.md = mdlog

module.exports = colors