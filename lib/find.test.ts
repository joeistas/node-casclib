import "jest"
import * as storage from "./storage"
import * as find from "./find"

const testData = require("../test-data.json")

test("findFilesSync", () => {
  const storageHandle = storage.openStorageSync(testData.storageLocation)
  const results = find.findFilesSync(storageHandle, testData.searchPattern)

  expect(results).toHaveLength(1);
  const result = results[0]
  expect(result).toHaveProperty("baseName")
  expect(result).toHaveProperty("fileSize")
  expect(result).toHaveProperty("fullName", testData.searchPattern)
})

describe("findFiles", () => {
  describe("with callback", () => {
    test("list file path in arguments", done => {
      storage.openStorage(testData.storageLocation, (error, storageHandle) => {
        if(error) {
          done.fail(error)
        }

        find.findFiles(storageHandle, testData.searchPattern, "", (error, results) => {
          if(error) {
            done.fail(error)
          }

          expect(results).toHaveLength(1);
          const result = results[0]
          expect(result).toHaveProperty("baseName")
          expect(result).toHaveProperty("fileSize")
          expect(result).toHaveProperty("fullName", testData.searchPattern)

          done()
        })
      })
    })

    test("without list file path in arguments", done => {
      storage.openStorage(testData.storageLocation, (error, storageHandle) => {
        if(error) {
          done.fail(error)
        }

        find.findFiles(storageHandle, testData.searchPattern, (error, results) => {
          if(error) {
            done.fail(error)
          }

          expect(results).toHaveLength(1);
          const result = results[0]
          expect(result).toHaveProperty("baseName")
          expect(result).toHaveProperty("fileSize")
          expect(result).toHaveProperty("fullName", testData.searchPattern)

          done()
        })
      })
    })
  })

  describe("without callback", () => {
    test("list file path in arguments", () => {
      return storage.openStorage(testData.storageLocation)
        .then(storageHandle => find.findFiles(storageHandle, testData.searchPattern, ""))
        .then(results => {
          expect(results).toHaveLength(1);
          const result = results[0]
          expect(result).toHaveProperty("baseName")
          expect(result).toHaveProperty("fileSize")
          expect(result).toHaveProperty("fullName", testData.searchPattern)
        })
    })

    test("without list file path in arguments", () => {
      return storage.openStorage(testData.storageLocation)
        .then(storageHandle => find.findFiles(storageHandle, testData.searchPattern))
        .then(results => {
          expect(results).toHaveLength(1);
          const result = results[0]
          expect(result).toHaveProperty("baseName")
          expect(result).toHaveProperty("fileSize")
          expect(result).toHaveProperty("fullName", testData.searchPattern)
        })
    })
  })
})
