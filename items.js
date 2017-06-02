var dw = require('dungeonworld-data')
var console = require('./lib/console')
var {elipses} = require('./lib/helpers');

console.log('helpers', dw.helpers);

console.h1('Items');
for(var k in dw.basicData.equipment) {
  var item = dw.basicData.equipment[k]
  if(item == 'index') {
    //TODO: rpgparser-data should not be adding this
    continue
  }
  console.hr2()
  console.log(item.name.bold)
  if(item.tags) {
    //Go through all the tags on this item
    //If it's a basic tag like 'near' then we display a snippet of the description of that tag
    //If it's complex like {weight: 2} then we use the built in tag helper from Dungeon World Data
    item.tags.forEach(function (givenTag) {
      var name = dw.helpers.tag(givenTag);
      var tag = dw.helpers.getTag(givenTag);
      console.log(name.cyan + ': ' + elipses(tag.description, 80).gray);
    });
  }
  if(item.description) {
    console.log(item.description)
  }
}