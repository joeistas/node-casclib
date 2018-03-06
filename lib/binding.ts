const addon = require('../build/Release/casclib-native');

export const LOCALES = Object.keys(addon.locales)

export type GameName =
  "Heroes of the Storm" |
  "World of Warcraft" |
  "Diablo 3" |
  "Overwatch" |
  "Starcraft" |
  "Starcraft II" |
  "Unknown"

export interface AddonStorageInfo {
  fileCount: number
  gameName: GameName
  gameBuild: number,
  installedLocales: number,
}

export interface StorageInfo {
  fileCount: number
  gameName: GameName
  gameBuild: number,
  installedLocales: string[],
}

export interface FindResult {
  fullName: string
  baseName: string
  fileSize: number
}

export type OpenStorageCallback = (error: Error, storageHandle: any) => void
export type OpenFileCallback = (error: Error, fileHandle: any) => void
export type ReadFileCallback = (error: Error, fileData: Buffer) => void

function localeMaskToList(localeMask: number): string[] {
  return Object.entries(addon.locales)
    .filter(([name, mask]) => name !== 'ALL' && (localeMask & mask) !== 0)
    .map(([name, mask]) => name)
}

function localesToMask(locales: string[]): number {
  let mask = 0;
  locales.forEach(name => mask |= addon.locales[name])

  return mask
}

export function openStorageSync(path: string, locales: string[] = []) {
  return addon.openCascStorageSync(path, localesToMask(locales))
}

export function openStorage(path: string): Promise<any>
export function openStorage(path: string, locales: string[]): Promise<any>
export function openStorage(path: string, locales: string[], callback: OpenStorageCallback): null
export function openStorage(path: string, callback: OpenStorageCallback): null
export function openStorage(path: string, localesOrCallback: string[] | OpenStorageCallback = [], callback?: OpenStorageCallback): null | Promise<any> {
  let locales = [ addon.locales['ALL'] ]
  if(Array.isArray(localesOrCallback)) {
    locales = localesOrCallback
  }
  else {
    callback = localesOrCallback
  }
  return addon.openCascStorage(path, localesToMask(locales), callback)
}

export function closeStorage(storageHandle: any) {
  addon.closeCascStorage(storageHandle)
}

export function getStorageInfo(storageHandle: any): StorageInfo {
  const info = addon.getCascStorageInfo(storageHandle) as AddonStorageInfo

  return {
    fileCount: info.fileCount,
    gameName: info.gameName,
    gameBuild: info.gameBuild,
    installedLocales: localeMaskToList(info.installedLocales),
  }
}

export function findFilesSync(storageHandle: any, searchPattern: string = "*", listFilePath: string = ''): FindResult[] {
  return addon.findCascFilesSync(storageHandle, searchPattern, listFilePath)
}

export function findFiles(
  storageHandle: any,
  searchPattern: string,
  listFilePath: string = '',
  callback?: (error: Error, results: FindResult[]) => void
): null | Promise<FindResult[]> {
  return addon.findCascFiles(storageHandle, searchPattern, listFilePath, callback)
}

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
