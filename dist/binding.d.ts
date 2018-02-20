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
export declare function openSync(path: string, locales?: string[]): any;
export declare function open(path: string, locales?: string[], callback?: (error: Error, handle: any) => void): null | Promise<any>;
export declare function close(storageHandle: any): void;
export declare function getStorageInfo(storageHandle: any): StorageInfo;
export declare function findFilesSync(storageHandle: any, searchPattern: string, listFilePath?: string): FindResult[];
export declare function findFiles(storageHandle: any, searchPattern: string, listFilePath?: string, callback?: (error: Error, results: FindResult[]) => void): FindResult[];
