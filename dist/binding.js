"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addon = require('../build/Release/casclib-native');
exports.LOCALES = Object.keys(addon.locales);
function localeMaskToList(localeMask) {
    return Object.entries(addon.locales)
        .filter(([name, mask]) => name !== 'ALL' && (localeMask & mask) !== 0)
        .map(([name, mask]) => name);
}
function localesToMask(locales) {
    let mask = 0;
    locales.forEach(name => mask |= addon.locales[name]);
    return mask;
}
function openSync(path, locales = []) {
    return addon.openCascStorageSync(path, localesToMask(locales));
}
exports.openSync = openSync;
function open(path, locales = [], callback) {
    return addon.openCascStorage(path, localesToMask(locales), callback);
}
exports.open = open;
function close(storageHandle) {
    addon.closeCascStorage(storageHandle);
}
exports.close = close;
function getStorageInfo(storageHandle) {
    const info = addon.getCascStorageInfo(storageHandle);
    return {
        fileCount: info.fileCount,
        gameName: info.gameName,
        gameBuild: info.gameBuild,
        installedLocales: localeMaskToList(info.installedLocales),
    };
}
exports.getStorageInfo = getStorageInfo;
function findFilesSync(storageHandle, searchPattern, listFilePath = '') {
    return addon.findCascFilesSync(storageHandle, searchPattern, listFilePath);
}
exports.findFilesSync = findFilesSync;
function findFiles(storageHandle, searchPattern, listFilePath = '', callback) {
    return addon.findCascFiles(storageHandle, searchPattern, listFilePath, callback);
}
exports.findFiles = findFiles;
