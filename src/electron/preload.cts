const electron = require('electron');


electron.contextBridge.exposeInMainWorld('wylElectron', {
    subscribeStatistic: (callback:(statistics: Statistics) => void) => {
        electron.ipcRenderer.on('statistic', (_: Electron.IpcRendererEvent, stats: Statistics) => {
            callback(stats);
        });
    },
    getStaticData: () => electron.ipcRenderer.invoke('getStaticData')
} satisfies Window['wylElectron']);