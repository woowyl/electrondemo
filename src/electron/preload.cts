const electron = require('electron');


electron.contextBridge.exposeInMainWorld('wylElectron', {
    subscribeStatistic: (callback:(statistics: any) => void) => {
        electron.ipcRenderer.on('statistic', (_: Electron.IpcRendererEvent, stats: any) => {
            callback(stats);
        });
    },
    getStaticData: () => electron.ipcRenderer.invoke('getStaticData')
});