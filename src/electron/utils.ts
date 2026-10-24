import { ipcMain } from "electron/main";

export function isDev(): boolean {
    return process.env.NODE_ENV === "development"
}

export function ipcMainHandle<Key extends keyof EventPayloadsMapping>(
    key: Key, 
    handler: () => EventPayloadsMapping[Key]
) { 
    ipcMain.handle(key, () => handler());
}

export function ipcWebContentsSend<Key extends keyof EventPayloadsMapping>(
    key: Key,
    webContents: Electron.WebContents,
    payload: EventPayloadsMapping[Key]
) {
    webContents.send(key, payload);
}
