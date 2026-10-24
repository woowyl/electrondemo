import osUtils from 'os-utils';
import fs from 'fs';
const POLL_INTERVAL = 500;


export function pollResouces() {
    setInterval(async () => {
       const cpuUsage = await getCpuUsage();
       const ramUsage = await getRamUsage();
       const storageUsage = getStorageUsage();
      console.log({
        cpuUsage,
        ramUsage,
        storageUsage: storageUsage.usage
      })
    }, POLL_INTERVAL);
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