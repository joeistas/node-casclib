import "jest"
import * as storage from "../lib/storage"
import * as files from "../lib/files"

const testData = require("../test-data.json")

const fileExpectations = [
  expect.stringContaining('<?xml version="1.0" encoding="us-ascii"?>'),
  expect.stringContaining('<Catalog>'),
  expect.stringContaining('<CHero default="1">'),
  expect.stringContaining('</CHero>'),
  expect.stringContaining('</Catalog>'),
]

function testBuffer(buffer: Buffer) {
  expect(buffer).toBeInstanceOf(Buffer)

  const str = buffer.toString("utf8")

  fileExpectations.forEach(expectation => {
    expect(str).toEqual(expectation)
  })
}

test("openFileSync", () => {
  const storageHandle = storage.openStorageSync(testData.storageLocation)
  const fileHandle = files.openFileSync(storageHandle, testData.cascFilePath)

  expect(fileHandle).toBeDefined()
})

describe("openFile", () => {
  test("with callback", done => {
    storage.openStorage(testData.storageLocation, (error, storageHandle) => {
      if(error) {
        done.fail(error)
      }

      files.openFile(storageHandle, testData.cascFilePath, (error, fileHandle) => {
        if(error) {
          done.fail(error)
        }

        expect(fileHandle).toBeDefined()

        done()
      })
    })
  })

  test("without callback", () => {
    return storage.openStorage(testData.storageLocation)
      .then(storageHandle => files.openFile(storageHandle, testData.cascFilePath))
      .then(fileHandle => expect(fileHandle).toBeDefined())
  })
})

test("readSync", () => {
  const storageHandle = storage.openStorageSync(testData.storageLocation)
  const fileHandle = files.openFileSync(storageHandle, testData.cascFilePath)

  const fileBuffer = files.readSync(fileHandle)

  testBuffer(fileBuffer)
})

describe("read", () => {
  test("with callback", done => {
    storage.openStorage(testData.storageLocation, (error, storageHandle) => {
      if(error) {
        done.fail(error)
      }

      files.openFile(storageHandle, testData.cascFilePath, (error, fileHandle) => {
        if(error) {
          done.fail(error)
        }

        files.read(fileHandle, (error, buffer) => {
          if(error) {
            done.fail(error)
          }

          testBuffer(buffer)
          done()
        })
      })
    })
  })

  test("without callback", () => {
    return storage.openStorage(testData.storageLocation)
      .then(storageHandle => files.openFile(storageHandle, testData.cascFilePath))
      .then(fileHandle => files.read(fileHandle))
      .then(buffer => testBuffer(buffer))
  })
})

test("readFileSync", () => {
  const storageHandle = storage.openStorageSync(testData.storageLocation)
  const fileBuffer = files.readFileSync(storageHandle, testData.cascFilePath)

  testBuffer(fileBuffer)
})

describe("readFile", () => {
  test("with callback", done => {
    storage.openStorage(testData.storageLocation, (error, storageHandle) => {
      if(error) {
        done.fail(error)
      }

      files.readFile(storageHandle, testData.cascFilePath, (error, buffer) => {
        if(error) {
          done.fail(error)
        }

        testBuffer(buffer)
        done()
      })
    })
  })

  test("without callback", () => {
    return storage.openStorage(testData.storageLocation)
      .then(storageHandle => files.readFile(storageHandle, testData.cascFilePath))
      .then(buffer => testBuffer(buffer))
  })
})
