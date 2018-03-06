const addon = require('../build/Release/casclib-native')

export type OpenFileCallback = (error: Error, fileHandle: any) => void
export type ReadFileCallback = (error: Error, fileData: Buffer) => void

export function openFileSync(storageHandle: any, filePath: string) {
  return addon.openCascFileSync(storageHandle, filePath)
}

export function openFile(storageHandle: any, filePath: string): Promise<any>
export function openFile(storageHandle: any, filePath: string, callback: OpenFileCallback): null
export function openFile(storageHandle: any, filePath: string, callback?: OpenFileCallback): null | Promise<any> {
  return addon.openCascFile(storageHandle, filePath, callback)
}

export function closeFile(fileHandle: any) {
  return addon.closeCascFile(fileHandle)
}

export function readSync(fileHandle: any): Buffer {
  return addon.cascReadSync(fileHandle)
}

export function read(fileHandle: any): Promise<Buffer>
export function read(fileHandle: any, callback: ReadFileCallback): null
export function read(fileHandle: any, callback?: ReadFileCallback): null | Promise<Buffer> {
  return addon.cascRead(fileHandle, callback)
}

export function readFileSync(storageHandle: any, filePath: string) {
  const fileHandle = openFileSync(storageHandle, filePath)
  return readSync(fileHandle)
}

export function readFile(storageHandle: any, filePath: string): Promise<any>
export function readFile(storageHandle: any, filePath: string, callback: ReadFileCallback): null
export function readFile(storageHandle: any, filePath: string, callback?: ReadFileCallback): null | Promise<any> {
  if(callback) {
    openFile(storageHandle, filePath, (error: Error, fileHandle: any) => {
      if(error) {
        throw error
      }

      read(fileHandle, callback)
    })
    return null
  }

  return openFile(storageHandle, filePath)
    .then(fileHandle => read(fileHandle))
}
