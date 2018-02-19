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
function openCascStorageSync(path, locales = []) {
    return addon.openCascStorageSync(path, localesToMask(locales));
}
exports.openCascStorageSync = openCascStorageSync;
function openCascStorage(path, locales = [], callback) {
    return addon.openCascStorage(path, localesToMask(locales), callback);
}
exports.openCascStorage = openCascStorage;
function closeCascStorage(storageHandle) {
    addon.closeCascStorage(storageHandle);
}
exports.closeCascStorage = closeCascStorage;
function getCascStorageInfo(storageHandle) {
    const info = addon.getCascStorageInfo(storageHandle);
    return {
        fileCount: info.fileCount,
        gameName: info.gameName,
        gameBuild: info.gameBuild,
        installedLocales: localeMaskToList(info.installedLocales),
    };
}
exports.getCascStorageInfo = getCascStorageInfo;
