import { app, BrowserWindow, ipcMain} from "electron"
import path from "path"
import { ipcMainHandle, isDev } from "./utils.js"
import { getStaticData, pollResouces } from "./resourceManager.js"
import { getPreloadPath, getUIPath } from "./pathResolver.js"


app.whenReady().then(() => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            // title: "my-electron-app",
            preload: getPreloadPath(),
        }
    })
    if (isDev()) {
        mainWindow.loadURL("http://localhost:9100")
    } else {
        mainWindow.loadFile(getUIPath())
    }
    pollResouces(mainWindow);

    ipcMainHandle('getStaticData', () => {
        return getStaticData();
    });
})
