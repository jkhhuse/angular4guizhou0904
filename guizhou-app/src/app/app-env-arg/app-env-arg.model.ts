export class EnvFile {
  'id': string;
  'updateUserId': null | string | number;
  'createUserId': number;
  'groupId': number;
  'createTime': string;
  'updateTime': string;
  'description': string;
  'name': string;
}

export class EnvFiles {
  opEnvfilesList: EnvFile[];
  countEnvfile: number;
  totalPage: number;
  page: number;
  size: number;
}

export class EnvFileDetail {
  backend_return: BackendReturn;
}

export class BackendReturn {
  created_at: string;
  updated_at: string;
  name: string;
  content: string[][];
  space_name: string;
  description: string;
}

export class EnvfileAddReqBody {
  content: string[][];
  create_use_id: number;
  description: string;
  name: string;
}

export class EnvfileModifyReqBody {
  content: string[][];
  update_use_id: number;
  description: string;
}
