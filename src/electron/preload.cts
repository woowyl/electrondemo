const electron = require('electron');


electron.contextBridge.exposeInMainWorld('wylElectron', {
    subscribeStatistic: (callback:(statistics: Statistics) => void) => {
       ipcOn('statistic', (stats) => {
            callback(stats);
        });
    },
    getStaticData: () => ipcInvoke('getStaticData')
} satisfies Window['wylElectron']);


function ipcInvoke<Key extends keyof EventPayloadsMapping>(
    key: Key
): Promise<EventPayloadsMapping[Key]> {
    return electron.ipcRenderer.invoke(key);
}

function ipcOn<Key extends keyof EventPayloadsMapping>(
    key: Key,
    callback: (payload: EventPayloadsMapping[Key]) => void
) {
    electron.ipcRenderer.on(key, (_: any, payload: any) => {
        callback(payload);
    });
}