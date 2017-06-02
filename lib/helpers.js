module.exports = {
  elipses: function (str, maxLength) {
    if(str.length > maxLength) {
      return str.substr(0, (maxLength - 3)) + '...'
    }
    return str
  },
  rightpad: function (str, width, char) {
    char = char || ' '
    return (str.toString() + char.repeat(width)).substr(0, width);
  }
}