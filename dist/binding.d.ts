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
export declare function openCascStorageSync(path: string, locales?: string[]): any;
export declare function openCascStorage(path: string, locales?: string[], callback?: (error: Error, handle: any) => void): any;
export declare function closeCascStorage(storageHandle: any): void;
export declare function getCascStorageInfo(storageHandle: any): StorageInfo;
