var dw = require('dungeonworld-data')
var console = require('./console')

for(var k in dw.basicData.equipment) {
  var item = dw.basicData.equipment[k]
  if(item == 'index') {
    //TODO: rpgparser-data should not be adding this
    continue
  }
  console.hr2()
  console.log(item.name.bold)
  if(item.tags) {
    console.log(item.tags.join(", ").italic)
  }
  if(item.description) {
    console.log(item.description)
  }
}