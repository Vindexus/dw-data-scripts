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
colors.width = 80

colors.hr1 = function () {
  console.log(' ')
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
}

colors.h2 = function (msg) {
  colors.hr2()
  colors.log(msg)
}

colors.label = function (lbl, msg) {
  console.log(colors.yellow(lbl), msg)
}

colors.log = console.log

colors.md = mdlog

module.exports = colors