const Casclib = require("../dist/binding.js");

// const storageHandle = Casclib.openStorageSync("C:\\Program Files (x86)\\Heroes of the Storm")
// console.log(storageHandle)
// console.log(Casclib.getStorageInfo(storageHandle))
// const results = Casclib.findFilesSync(storageHandle, "mods/heroes.stormmod/esmx.stormassets/LocalizedData/Sounds/VO/Probius*")
// console.log(results.length)
// console.log(results[0])
// const fileHandle = Casclib.openFileSync(storageHandle, "mods/heroesdata.stormmod/base.stormdata/GameData/HeroData.xml")
// console.log(fileHandle)
// Casclib.closeFile(fileHandle)
// Casclib.closeStorage(storageHandle)

// Casclib.openCascStorage("C:\\Program Files (x86)\\Heroes of the Storm", [], function(error, storageHandle) {
//   console.log("Callback")
//   console.log(error, storageHandle)
//   Casclib.closeCascStorage(storageHandle)
// })

Casclib.openStorage("C:\\Program Files (x86)\\Heroes of the Storm")
  .then(storageHandle => {
    console.log("Promise")
    console.log(storageHandle)
    console.log(Casclib.getStorageInfo(storageHandle))
    return Casclib.openFile(storageHandle, "mods/heroesdata.stormmod/base.stormdata/GameData/HeroData.xml")
      .then(fileHandle => {
        console.log(fileHandle)

        return Casclib.read(fileHandle)
          .then(fileData => {
            console.log(fileData.toString('utf8'))
            Casclib.closeFile(fileHandle)
            Casclib.closeStorage(storageHandle)
          })
      })
  })
  .catch(error => console.log(error))

console.log("complete")
