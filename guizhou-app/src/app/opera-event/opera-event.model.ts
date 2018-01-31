
export class SortMap {
  user: string;
  type: string;
  object: string;
  result: string;
  time: string;
}

export class Condition {
  result: string;
  time: string;
  keyword: string;
}

export class EventTable {
  meta: Meta;
  operateLogs: OperateLog[];
}

export class EventChart {
  operateLogs: OperateLog[];
  counts: Count[];
  meta: Meta;
}

export class OperateLog {
  id: number;
  userName: string;
  operateType: string;
  serverAddress: string;
  clientIp: string;
  operateResult: string;
  operateRemark: string;
  operateTime: number;
  opObj: string;
}

export class Count {
  count: number;
  operateTime: string;
}

export class Meta {
  code: number;
  offset: number;
  limit: number;
  totalPage: number;
  totalSize: number;
}

export class CheckOption {
  label: string;
  value: string;
  checked: boolean;
}
