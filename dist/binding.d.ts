/// <reference types="node" />
export declare const LOCALES: string[];
export declare type GameName = "Heroes of the Storm" | "World of Warcraft" | "Diablo 3" | "Overwatch" | "Starcraft" | "Starcraft II" | "Unknown";
export interface AddonStorageInfo {
    fileCount: number;
    gameName: GameName;
    gameBuild: number;
    installedLocales: number;
}
export interface StorageInfo {
    fileCount: number;
    gameName: GameName;
    gameBuild: number;
    installedLocales: string[];
}
export interface FindResult {
    fullName: string;
    baseName: string;
    fileSize: number;
}
export declare type OpenStorageCallback = (error: Error, storageHandle: any) => void;
export declare type OpenFileCallback = (error: Error, fileHandle: any) => void;
export declare type ReadCallback = OpenFileCallback;
export declare type ReadFileCallback = (error: Error, fileData: Buffer) => void;
export declare function openStorageSync(path: string, locales?: string[]): any;
export declare function openStorage(path: string): Promise<any>;
export declare function openStorage(path: string, locales: string[]): Promise<any>;
export declare function openStorage(path: string, locales: string[], callback: OpenStorageCallback): null;
export declare function openStorage(path: string, callback: OpenStorageCallback): null;
export declare function closeStorage(storageHandle: any): void;
export declare function getStorageInfo(storageHandle: any): StorageInfo;
export declare function findFilesSync(storageHandle: any, searchPattern?: string, listFilePath?: string): FindResult[];
export declare function findFiles(storageHandle: any, searchPattern: string, listFilePath?: string, callback?: (error: Error, results: FindResult[]) => void): FindResult[];
export declare function openFileSync(storageHandle: any, filePath: string): any;
export declare function openFile(storageHandle: any, filePath: string): Promise<any>;
export declare function openFile(storageHandle: any, filePath: string, callback: OpenFileCallback): null;
export declare function closeFile(fileHandle: any): any;
export declare function readSync(fileHandle: any): Buffer;
export declare function read(fileHandle: any): Promise<any>;
export declare function read(fileHandle: any, callback: ReadCallback): null;
export declare function readFileSync(storageHandle: any, filePath: string): Buffer;
export declare function readFile(storageHandle: any, filePath: string): Promise<any>;
export declare function readFile(storageHandle: any, filePath: string, callback: ReadFileCallback): null;
