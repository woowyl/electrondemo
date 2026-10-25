import { ipcMain } from "electron/main";
import { pathToFileURL } from "url";
import { getUIPath } from "./pathResolver.js";

export function isDev(): boolean {
    return process.env.NODE_ENV === "development"
}

export function ipcMainHandle<Key extends keyof EventPayloadsMapping>(
    key: Key, 
    handler: () => EventPayloadsMapping[Key]
) { 
    // course? 考虑到目前我们只需要在后端进行验证。所以我们只需要在这里做
    ipcMain.handle(key, (event) => {
        if (!event.senderFrame) {
            throw new Error('Invalid sender frame');
        }
        validateEventFrame(event.senderFrame);
        handler()
    });
}

export function ipcWebContentsSend<Key extends keyof EventPayloadsMapping>(
    key: Key,
    webContents: Electron.WebContents,
    payload: EventPayloadsMapping[Key]
) {
    webContents.send(key, payload);
}


export function validateEventFrame(frame: Electron.WebFrameMain) {
    if (isDev() && new URL(frame.url).hostname === 'localhost') {
        return true;
    }
    if (frame.url !== pathToFileURL(getUIPath()).toString()) {
        throw new Error('Invalid frame url');
    }
}