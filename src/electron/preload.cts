const electron = require('electron');


electron.contextBridge.exposeInMainWorld('wylElectron', {
    subscribeStatistic: (callback:(statistics: any) => void) => callback({}),
    getStaticData: () =>  console.log('getStaticData called')
});