var dw = require('dungeonworld-data')
var console = require('./lib/console')
var helpers = require('./lib/helpers');
var elipses = helpers.elipses;
console.log('helpers', dw.helpers);

console.h1('Items');
var items = ['vorpal_sword', 'devilsbane_oil', 'common_scroll'];
for(var i = 0; i < items.length; i++) {
  var k = items[i];
  var item = dw.basicData.equipment[k]
  if(item == 'index') {
    //TODO: rpgparser-data should not be adding this
    continue
  }
  console.hr2()
  console.log(item.name.bold)
  if(item.tags) {
    //Go through all the tags on this item
    item.tags.forEach(function (givenTag) {
      var name = dw.helpers.tag(givenTag);
      var tag = dw.helpers.getTag(givenTag);
      if(tag) {
        console.log(name.cyan + ': ' + elipses(tag.description, 80).gray);
      }
      else {
        console.log(name.gray);
      }
    });
  }
  if(item.description) {
    console.log(item.description)
  }
}