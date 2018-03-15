export class ViewCount {
  clusterCount: string;
  groupCount: string;
  hostCount: string;
  cpuCount: string | number;
  memCount: string | number;
  storageCount: string | number;
}

export class ServiceAndAppChart {
  normalApp: number;
  abnormalApp: number;
  serviceRunning: number;
  serviceDeploying: number;
  serviceStoped: number;
}

export class ClusterAndHostChart {
  insufficient: number;
  sufficient: number;
  abnormalHost: number;
  normalHost: number;
}

export class Container {
  hostCount: number | string;
  clusterCount: number | string;
  cpuUsed: string;
  cpuAssigned: string;
  memUsed:  string;
  memAssigned: string;
  storageUsed: string;
  storageAssigned: string;
}

export class Oracle {
  sumClusters: number;
  sumInstances: number;
  sumNode: number;
  cpuUsed: string;
  cpuAssigned: string;
  memUsed:  string;
  memAssigned: string;
  storageUsed: string;
  storageAssigned: string;
  sessionUsed: string;
  sessionAssigned: string;
}

export class BigData {
  clusterCount: number;
  hostCount: number;
  cpuUsed: string;
  cpuAssigned: string;
  memUsed: string;
  memAssigned: string;
  storageUsed: string;
  storageAssigned: string;
  components: string[];
}

export class Image {
  private: number;
  public: number;
  totalSize: number;
}

export class ExtraResource {
  containerCount: number | string;
  portUsed: string;
  portAssigned: string;
  k8sSlaveRun: number;
  k8sSlaveError: number;
  k8sSysRun: number;
  k8sSysError: number;
}

export class AlertState {
  alertingState: number;
  nodataState: number;
  okState: number;
}

export class ViewCountBark {
  imageCount: number | null;
  serviceCount: number | null;
  appCount: number | null;
}

export class Dps {
  date: string[];
  value: string[];
}
