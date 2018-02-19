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

export function openCascStorageSync(path: string, locales: string[] = []) {
  return addon.openCascStorageSync(path, localesToMask(locales))
}

export function openCascStorage(path: string, locales: string[] = [], callback?: (error: Error, handle: any) => void): null | Promise<any> {
  return addon.openCascStorage(path, localesToMask(locales), callback)
}

export function closeCascStorage(storageHandle: any) {
  addon.closeCascStorage(storageHandle)
}

export function getCascStorageInfo(storageHandle: any): StorageInfo {
  const info = addon.getCascStorageInfo(storageHandle) as AddonStorageInfo

  return {
    fileCount: info.fileCount,
    gameName: info.gameName,
    gameBuild: info.gameBuild,
    installedLocales: localeMaskToList(info.installedLocales),
  }
}
