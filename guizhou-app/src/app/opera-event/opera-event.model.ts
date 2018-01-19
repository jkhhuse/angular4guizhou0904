export class EventTable {
  data: EventData[];
  total: number;
}

export class EventData {
  user: string;
  type: string;
  object: string;
  result: string;
  note: string;
  time: string | number;
}

export class SortMap {
  user: string;
  type: string;
  object: string;
  result: string;
  time: string;
}

export class Condition {
  type: string;
  object: string;
  result: string;
  time: string;
  keyword: string;
}
