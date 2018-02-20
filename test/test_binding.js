const Casclib = require("../dist/binding.js");
const assert = require("assert");
//
// assert(Casclib, "The expected module is undefined");
//
// function testBasic()
// {
//     const instance = new Casclib("mr-yeoman");
//     assert(instance.greet, "The expected method is not defined");
//     assert.strictEqual(instance.greet("kermit"), "mr-yeoman", "Unexpected value returned");
// }
//
// function testInvalidParams()
// {
//     const instance = new Casclib();
// }
//
// assert.doesNotThrow(testBasic, undefined, "testBasic threw an expection");
// assert.throws(testInvalidParams, undefined, "testInvalidParams didn't throw");
//
// console.log("Tests passed- everything looks OK!");

// const handle = Casclib.openSync("C:\\Program Files (x86)\\Heroes of the Storm")
// console.log(handle)
// console.log(Casclib.getStorageInfo(handle))
// const results = Casclib.findFilesSync(handle, "mods/heroes.stormmod/esmx.stormassets/LocalizedData/Sounds/VO/Probius*")
// console.log(results.length)
// console.log(results[0])
// Casclib.close(handle)

// Casclib.openCascStorage("C:\\Program Files (x86)\\Heroes of the Storm", [], function(error, handle) {
//   console.log("Callback")
//   console.log(error, handle)
//   Casclib.closeCascStorage(handle)
// })

Casclib.open("C:\\Program Files (x86)\\Heroes of the Storm")
  .then(handle => {
    console.log("Promise")
    console.log(handle)
    console.log(Casclib.getStorageInfo(handle))
    return Casclib.findFiles(handle, "mods/heroes.stormmod/esmx.stormassets/LocalizedData/Sounds/VO/Probius*")
      .then(results => {
        console.log(results.length)
        console.log(results[0], results[1])
        Casclib.close(handle)
      })
  })
  .catch(error => console.log(error))

console.log("complete")
