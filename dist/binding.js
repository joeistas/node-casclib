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
function openStorageSync(path, locales = []) {
    return addon.openCascStorageSync(path, localesToMask(locales));
}
exports.openStorageSync = openStorageSync;
function openStorage(path, localesOrCallback = [], callback) {
    let locales = [addon.locales['ALL']];
    if (Array.isArray(localesOrCallback)) {
        locales = localesOrCallback;
    }
    else {
        callback = localesOrCallback;
    }
    return addon.openCascStorage(path, localesToMask(locales), callback);
}
exports.openStorage = openStorage;
function closeStorage(storageHandle) {
    addon.closeCascStorage(storageHandle);
}
exports.closeStorage = closeStorage;
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
function findFilesSync(storageHandle, searchPattern = "*", listFilePath = '') {
    return addon.findCascFilesSync(storageHandle, searchPattern, listFilePath);
}
exports.findFilesSync = findFilesSync;
function findFiles(storageHandle, searchPattern, listFilePath = '', callback) {
    return addon.findCascFiles(storageHandle, searchPattern, listFilePath, callback);
}
exports.findFiles = findFiles;
function openFileSync(storageHandle, filePath) {
    return addon.openCascFileSync(storageHandle, filePath);
}
exports.openFileSync = openFileSync;
function openFile(storageHandle, filePath, callback) {
    return addon.openCascFile(storageHandle, filePath, callback);
}
exports.openFile = openFile;
function closeFile(fileHandle) {
    return addon.closeCascFile(fileHandle);
}
exports.closeFile = closeFile;
function readSync(fileHandle) {
    return addon.cascReadSync(fileHandle);
}
exports.readSync = readSync;
function read(fileHandle, callback) {
    return addon.cascRead(fileHandle, callback);
}
exports.read = read;
function readFileSync(storageHandle, filePath) {
    const fileHandle = openFileSync(storageHandle, filePath);
    return readSync(fileHandle);
}
exports.readFileSync = readFileSync;
function readFile(storageHandle, filePath, callback) {
    if (callback) {
        openFile(storageHandle, filePath, (error, fileHandle) => {
            if (error) {
                throw error;
            }
            read(fileHandle, callback);
        });
        return null;
    }
    return openFile(storageHandle, filePath)
        .then(fileHandle => read(fileHandle));
}
exports.readFile = readFile;
