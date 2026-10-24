import osUtils from 'os-utils';
import fs from 'fs';
import os from 'os';

const POLL_INTERVAL = 500;


export function pollResouces(mainWindow?: Electron.BrowserWindow) {
    setInterval(async () => {
       const cpuUsage = await getCpuUsage();
       const ramUsage = await getRamUsage();
       const storageUsage = getStorageUsage();
      mainWindow?.webContents.send('statistic', {
        cpuUsage,
        ramUsage,
        storageUsage: storageUsage.usage,
      });
    }, POLL_INTERVAL);
}

export function getStaticData() {
    const totalStorage = getStorageUsage().total;
    const cpuModel = os.cpus()[0].model;

    const totalMemoryGB = Math.floor(osUtils.totalmem() / (1024)); // GB

    return {
        totalStorage,
        cpuModel,
        totalMemoryGB
    }
}

function getCpuUsage() {
    return new Promise<number>(resolve => { 
        osUtils.cpuUsage(resolve);
        // 等效于
        // osUtils.cpuUsage((percent) => {
        //     resolve(percent);
        // });
    })
}

function getRamUsage() {
    return 1 - osUtils.freememPercentage();
}

function getStorageUsage() {
    // require node 18+
    const stats = fs.statfsSync(process.platform === 'win32' ? 'C:\\' : '/');
    const total = stats.bsize * stats.blocks;
    const free = stats.bsize * stats.bfree;

    return {
        total: Math.floor(total / (1024 * 1024 * 1024)), // GB
        usage:  1 - (free / total)
    }
}
