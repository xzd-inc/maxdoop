import { Status } from ".";
// 协议模块
export namespace Protocol {
  export interface Base {
    protocolName: string;
    type: string;
    remark?: string;
    attachmentIds?: any[]
    pluginUri?: string
    attachments?:any;
  }
  export interface Create extends Base {
    file?: File;
  }
  export interface Update extends Create {
    id: string;
  }
  export interface Response extends Update {
    id: string;
    createTime: string;
    updateTime: string;
  }
}
// 网络适配器模块
export namespace Adapter {
  export interface Base {
    networkName: string;
    protocolType: string;
    networkIp: string;
    networkPort?: string;
    protocolId?: string;
    productId?: string;
    remark?: string;
    status?: Status;
    topic: any[];
    TCPserver?: string;
    port?: string;
    username?:string;
    password?: string;
    cacert?:string;
    broker?:string;
    attachmentIds?: any[];
    certificateIds?: any[];
    configuration?: any;
  }
  export interface Create extends Base {
    file?: File;
  }
  export interface Update extends Create {
    broker: any;
    id: string;
  }
  export interface Response extends Update {
    createTime: string;
    certificate?: string;
    productVo?:any
  }
}
// 物模型模块
export namespace ThingModel {
  export interface Base {
    modelName: string;
    remark?: string;
  }
  export interface Update extends Base {
    id: string;
  }
  export interface DataTypeDetail {
    min?: number;
    max?: number;
    unit?: string;
    unitName?: string;
    size?: number;
    step?: number;
    length?: number;
    boolTrue?: string;
    boolFalse?: string;
    item?: Record<string, string>;
    enumItem?: { label: string; value: any }[]; // 枚举项
  }
  export interface Properties extends DataTypeDetail {
    trueLabel?: unknown;
    falseLabel?: unknown;
    id?: string;
    modelId?: string;
    name?: string;
    identifier?: string;
    type: DataType;
    required?: "0" | "1";
    accessMode?: "rw" | "r"; // rw：读写； r：只读
    desc?: string;
  }
  export interface Server {
    componentId: string | number | (string | number)[] | undefined;
    // netComponentIds: string | number | (string | number)[] | undefined;
    thingId:string;
    id?: string;
    modelId?: string;
    name?: string;
    identifier?: string;
    required?: "0" | "1";
    callType?: "1" | "0" // 同步 | 异步  1:同步 0:异步 
    desc?: string;
    inputData?: Omit<Properties, "accessMode">[];
    outputData?: Omit<Properties, "accessMode">[];
  }
  export interface Event {
    id?: string;
    modelId?: string;
    name?: string;
    identifier?: string;
    required?: "0" | "1"; 
    type?: "info" | "alert" | "error";
    desc?: string;
    outputData?: Omit<Properties, "accessMode">[];
  }
  export interface ModelConfig {
    properties?: Properties;
    services?: Server;
    events?: Event;
  }
  export interface Response extends Update {
    id: string;
    createTime: string;
    updateTime: string;
    modelBodyStr?: string;
  }
}

// 产品模块
export namespace Product {
  export interface Base {
    name: string;
    type?: string;
    thingId?: string;
    netComponentIds: any[]
    networkType?: string; // 1直连设备、2网关设备、3网关子设备
    fatherId?: string;
    remark?: string;
    file: File;
  }
  export interface Update extends Base {
    id: string;
  }
  export interface Response extends Update {
    id: string;
    photoUrl?: string;
    createTime: string;
    updateTime: string;
    status: Status;
    attachmentIds?:any[]
    attachments?: any;
    networkType?:any
    idType?:any
  }
  export interface Detail extends Response {
    netComponentVo?: Adapter.Response;
    netProtocolVo?: Protocol.Response;
    thingsModelVo?: ThingModel.Response;
  }
}
// 设备模块
export namespace Device {
  export interface Base {
    deviceName: string;
    identifier: string;
    productId: string;
    remark?: string;
  }
  export interface Create extends Base {
    productId: string;
  }
  export interface Update extends Omit<Base, "identifier"> {
    id: string;
  }
  export interface Response extends Base {
    id: string;
    createTime: string;
    updateTime: string;
    status: Status;
    enable: any;
    parentDeviceId: any[];
  }
  export interface Detail extends Response {
    productInfo?: {
      productName: string;
      networkType?: any;
    };
  }
  export interface Properties {
    thingsProperties: ThingModel.Properties[];
    uplinkProperties: Record<string, any>;
  }
  export interface Events {
    thingsEvents: ThingModel.Event[];
    uplinkEvents: Record<string, any>;
  }
  export interface Services {
    thingsFunctions: ThingModel.Server[];
    linkFunctions: Record<string, any>;
  }
}
