// ? 系统全局字典

import { c } from "vite/dist/node/types.d-aGj9QkWt";

/**
 * @description：用户性别
 */
export const genderType = [
  { label: "男", value: 1 },
  { label: "女", value: 2 }
];

/**
 * @description 状态
 */
export const status = [
  { label: "启用", value: "1", tagType: "success" },
  { label: "禁用", value: "0", tagType: "danger" }
];

/**
 * @description 日志状态
 */
export const logStatus = [
  { label: "成功", value: "1", tagType: "success" },
  { label: "失败", value: "0", tagType: "danger" }
];

/**
 * @description：用户类型
 */
export const userType = [
  { label: "超级管理员", value: "1" },
  { label: "项目管理员", value: "2" },
  { label: "普通用户", value: "3" }
];

/**
 * @description：用户性别
 */
export const roleType = [
  { label: "超级管理员", value: "1" },
  { label: "管理员", value: "2" },
  { label: "普通角色", value: "3" }
];

/**
 * @description：协议类型
 */
export const protocolType = [{ label: "内部", value: "0" },{ label: "外部", value: "1" }];

/**
 * @description：网络类型 1.TCP-SERVER 2.UDP 3.HTTP 4.MQTT 5.COAP 6.LWM2M
 */
export const networkType = [
  { label: "TCP-SERVER", value: "1" },
  { label: "UDP", value: "2" },
  { label: "HTTP", value: "3" },
  { label: "MQTT", value: "4" },
  { label: "COAP", value: "5" },
  { label: "LWM2M", value: "6" }
];

/**
 * @description：数据类型
 */
export const dataTypeList: Array<{ label: string; value: DataType }> = [
  { label: "int", value: "int" },
  { label: "float", value: "float" },
  { label: "double", value: "double" },
  { label: "text", value: "text" },
  { label: "date", value: "date" },
  { label: "boolean", value: "boolean" },
  { label: "enum", value: "enum" }
  // { label: "long", value: "long" },
  // { label: "array", value: "array" },
  // { label: "object", value: "object" }
];

/**
 * @description：设备类型
 */
export const deviceType = [
  { label: "直连设备", value: "1" },
  { label: "网关设备", value: "2" },
  { label: "网关子设备", value: "3" }
];

export const idType= [
  { label: "系统唯一 ", value: "1" },
  { label: "产品唯一 ", value: "2" },
  { label: "网关唯一 ", value: "3" },
]

/**
 * @description：产品分类
 */
export const productType = [
  { label: "智慧城市", value: "1" },
  { label: "智慧农业", value: "2" }
];

/**
 * @description； 告警类型
 */
export const alarmType = [
  { label: "设备", value: "device" },
  { label: "商品", value: "product" }
]

/**
 * @description；: 告警级别
 */
export const alarmLevel = [
  { label: "超紧急", value: "1" },
  { label: "紧急", value: "2" },
  { label: "严重", value: "3" },
  { label: "一般", value: "4" },
  { label: "提醒", value: "5" }
]

/**
 *@description: 消息通知方式
 */
export const notifyType = [
  { label: "短信" ,value: "sms" }
]

/**
 * @description: 短信服务提供商
 */
export const provider = [
  { label: "阿里云短信", value: "aliyunSms" }
]

export const ruleType = [
  { label: "设备触发", value: "1" },
  { label: "定时触发", value: "2" },
  { label: "手动触发", value: "3" }
]

export const triggerType = [
  { label: "设备在线", value: "1" },
  { label: "设备离线", value: "2" },
  { label: "读取属性", value: "3" },
  { label: "修改属性", value: "4" },
  { label: "属性上报", value: "5" },
  { label: "功能调用", value: "6" },
]

export const systemType = [
  { label: "maxdoop-bsp", value: "1" },
  { label: "maxdoop-base",value: "2" },
  { label: "maxdoop-iot", value: "3" },
  { label: "maxdoop-dap", value: "4" },
  { label: "maxdoop-dmp", value: "5" },
  { label: "maxdoop-app", value: "6" }
]