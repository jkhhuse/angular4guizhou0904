// 监控panels
export class Panels {
  count: number;
  data: Resource[];
  num_page: number;
  page_size: number;
  message: string;
}

export class Resource {
  created_at: number;
  created_by: string;
  dashboard_name: string;
  display_name: string;
  namespace: string;
  orders: string;
  project_name: string;
  project_uuid: string;
}

export class Dashboards {
  message: string;
  data: DashboardInfo;
}

export class DashboardInfo {
  space_uuid: string;
  project_name: string;
  display_name: string;
  uuid: string;
  project_uuid: string;
  created_at: number;
  namespace: string;
  charts: Chart[];
  created_by: string;
  updated_at: number;
  dashboard_name: string;
  space_name: string;
  orders: string;
}

export class Chart {
  display_name: string;
  uuid: string;
  created_at: number;
  updated_at: number;
  metrics: Metrics;
}

export class Metrics {
  aggregator: string;
  metric: string;
  group_by: string;
  type: 'area' | 'line' | 'histogram';
  over: string;
}

