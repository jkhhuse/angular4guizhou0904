export class GrayListDetail {
  'id':string;
  'appInstance1Id':string;
  'appInstance2Id':string;
  'status':string;
  'createTime': any;
  'version1': string;
  'version2': string;
  'rules_intro': string;
  'microservices': string;
}

export class GrayUpdateReqBody {
  containerPort2: number;
  dsl: string;
  microservice1Id: string;
  microservice2Name: string;
  portId: string;
  weight: number;
}
