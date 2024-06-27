export * from "./lot";
// 请求响应参数（不包含data）
export interface Result {
  code: number;
  message: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  data: T;
}

// 状态类型
export type Status = "1" | "0" // 1:true 0:false

// 分页响应参数
export interface ResPage<T> {
  list: T[];
  pageNum: number;
  pageSize: number;
  total: number;
}

// 分页请求参数
export interface ReqPage {
  pageNum: number;
  pageSize: number;
}

// 文件上传模块
export namespace Upload {
  export interface ResFileUrl {
    fileUrl: string;
    id: string;
  }
}
// 文件
export interface File {
  id: string;
  fileUrl?: string;
}

// 登录模块
export namespace Login {
  export interface ReqLoginForm {
    account: string;
    password: string;
    captcha: string;
  }
  export interface ResLogin {
    access_token: string;
  }
  export interface ReqGetMenusForm {
    projectId: string;
  }
  export interface ResAuthButtons {
    [key: string]: string[];
  }
}

// 用户管理模块
export namespace User {
  export interface ReqUserParams extends ReqPage {
    id?: string;
    userName: string;
    account: string;
    password: string;
    gender: number;
    idCard: string;
    email: string;
    address: string;
    createTime: string[];
    roleIds?: string[];
    status: number;
  }
  export interface ResUserList {
    id: string;
    userName: string;
    account: string;
    roleDtos?: any[];
    gender: number;
    user: { detail: { age: number } };
    idCard: string;
    email: string;
    address: string;
    createTime: string;
    status: number;
    avatar: string;
    isAdmin: string;
    photo: any[];
    children?: ResUserList[];
  }
  export interface ResStatus {
    userLabel: string;
    userValue: number;
  }
  export interface ResGender {
    genderLabel: string;
    genderValue: number;
  }
  export interface ResDepartment {
    id: string;
    name: string;
    children?: ResDepartment[];
  }
  export interface ResRole {
    id: string;
    name: string;
    children?: ResDepartment[];
  }
  export interface Menus {
    id: string;
    name: string;
    child?: Menus[];
    icon: string;
    key: string;
    parentId: string;
  }
}

// 权限模块
export namespace Permission {
  export interface Action {
    action: string;
    name: string;
    description: string;
  }
  export interface Base {
    name: string;
    identification: string;
    description?: string;
    status: Status;
    actionBodyList: Action[] | []
  }
  export interface Response extends Base{
    id: string;
  }
}

export namespace Menus {
  export interface Response {
    id: string;
    parentId?: string;
    path: string;
    code: string;
    component?: string | (() => Promise<unknown>);
    redirect?: string;
    meta: MetaProps;
    status: Status;
    permissionBodyList?: any[];
    buttonBodyList?: ButtonBody[];
    buttonViewList?: ButtonBody[];
    children?: Response[];
  }
  export interface MetaProps {
    icon: string;
    title: string;
    activeMenu?: string;
    isLink?: string;
    isHide?: boolean;
    isFull?: boolean;
    isAffix?: boolean;
    isKeepAlive?: boolean;
  }
  export interface ButtonBody {
    name: string;
    id: string;
    description?: string;
  }
}

// 角色模块
export namespace Role {
  export interface Base {
    roleName: string;
    roleType: string;
    remark?: string;
  }
  export interface Response extends Base{
    id: string;
    createTime?: string;
  }
}

// 项目模块
export namespace Project {
  export interface CreateParams {
    projectName: string;
    description: string;
    type?: string;
    codes: string[];
  }
  export interface EditParams extends CreateParams {
    id: string;
    projectId?: string;
  }
  export interface Response {
    id: string;
    projectId: string;
    projectName: string;
    description?: string;
    createTime?: string;
  }
}

// 字典
export namespace Dict {
  export interface Source {
    id: string;
    name: string;
    code: string;
    remark?: string;
  }
  export interface CreateDict extends Omit<Source, "id"> {}
  export interface DictItem {
    id: string;
    code: string;
    value: string;
    label: string;
    sort?: number;
    remark?: string;
  }
  export interface CreateDictItem extends Omit<DictItem, "id"> {}
  export interface EditDictItem extends Omit<DictItem, "parentId"> {}
}

// 日志
export namespace Log {
  export interface Response {
    id: string;
    account: string;
    operation: string;
    requestUri: string;
    requestMethod: string;
    requestParams: string;
    requestTime: string;
    status: string;
    ip: string;
    userAgent: string;
    createTime: string;
  }
  export interface Exception extends Response {
    errorInfo: string;
  }
}


// 告警模块
export namespace Alarm {
  export interface AlarmParams {
    id?: string;
    alarmName?: string;
    alarmType?: string;
    alarmLevel?: string;
    remark?:string;
    createTime?: string[];
    status?: number;
  }
  export interface alarmHistory extends AlarmParams{
    time?:string;
  }
}

// 通知模块
export namespace Notice {
  export interface NoticeParams {
    id?: string;
    notifyName?: string;
    notifyType?: number;
    provider?: number;
    regionId?: string;
    accessKeyId?:string;
    secret?:string;
    configuration?: {
      regionId?: string;
      accessKeyId?:string;
      secret?:string;
    },
    // configuration?: number;
    remark?: string;
  }
  export interface NoticeTempate extends NoticeParams{
    id?:string;
    templateName?: string;
    notifyConfigId?: string;
    templateId?: string;
    receiver?: string;
    signature?: string;
    content?: string;
    remark?:string
    template: {
      templateId?: string,
      receiver?: string,
      signature?: string,
      content?: string,
    }
  }
}

// 规则引擎
export namespace ruleEngine {
  export interface linkage {
    id: string;
    ruleName?: string;
    ruleType?: string;
    ruleStatus?: number;
    remark?: string;
    trigger?: {
      type?: string;
      ruleType?: string;
    }
  }
  export interface Timer extends linkage {}
  export interface Actuator extends linkage {}
}


// 设备管控
export namespace vedioDevice {
  export interface monitor {
    id: string;
    name?: string;
    poit?: string;
    type?: string;
    use?: string;
    status?: string;
    updatetTime?: string;
  }
}