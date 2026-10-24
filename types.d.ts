type Statistics = {
  cpuUsage: never;
  ramUsage: number;
  diskUsage: number;
  storageUsage: number;
};

type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totalMemoryGB: number;
};

// 这里要注意interface的特性  重名的Window interface会被合并
interface Window {
  wylElectron: {
    subscribeStatistic: (callback: (statistics: Statistics) => void) => void;
    getStaticData: () => Promise<StaticData>;
  };
}