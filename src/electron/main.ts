import { app, BrowserWindow} from "electron"
import path from "path"
import { isDev } from "./utils.js"


app.whenReady().then(() => {
    const mainWindow = new BrowserWindow({})
    if (isDev()) {
        mainWindow.loadFile(path.join(app.getAppPath(), "dist-react", "index.html"))
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), "dist-react", "index.html"))
    }
})
