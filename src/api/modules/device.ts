import { Device } from "@/api/interface/index";
import { AUTH } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 设备模块
 */
// 获取设备列表
export const getDeviceListApi = (params?: { searchText: string }) => {
  return http.get<Device.Response[]>(AUTH + `/device/query`, params, { loading: false });
};
// 获取设备属性
export const getDeviceProperties = params => {
  return http.get<Device.Properties>(AUTH + `/device/detail/properties`, params, { loading: false });
};
// 获取设备事件
export const getDeviceEvents = params => {
  return http.get<Device.Events>(AUTH + `/device/detail/events`, params, { loading: false });
};

// 获取设备服务
export const getDeviceServices = params => {
  return http.get<any>(AUTH + `/device/detail/function`, params, { loading: false });
};
// 获取设备详情
export const getDeviceDetailApi = (params: Pick<Device.Response, "id">) => {
  return http.get<Device.Detail>(AUTH + `/device/detail`, params, { loading: false });
};
// 新增设备
export const addDevice = (params: Device.Base) => {
  return http.post<Device.Response>(AUTH + `/device/add`, params, { loading: false });
};
// 编辑设备
export const editDevice = (params: Device.Update) => {
  return http.post<Device.Response>(AUTH + `/device/edit`, params, { loading: false });
};
// 删除设备
export const deleteDeviceApi = (params: string[]) => {
  return http.post(AUTH + `/device/delete`, params, { loading: false });
};
// 修改设备状态
export const editDeviceStatus = params => {
  return http.post(AUTH + `/device/editStatus`, params, { loading: false });
};
// 物模型详情 服务详情
export const detailServe = (functionId) => {
  return http.get(AUTH + `/thingsModel/function/detail`,functionId,{})
}
// 物模型详情 服务详情（deviceId）
export const detailServes = (params) => {
  return http.get(AUTH + `/thingsModel/function/detail`,params,{})
}
// 调试服务页面
export const getDebugParams = (thingsFunctionId) => {
  return http.get(AUTH + `/device/getDebugParams`, thingsFunctionId, {})
}
// 获取调试结果
export const getDebugParamsResult = (params) => {
  return http.post(AUTH + `/device/getDebugResult`, params, {})
}
// 根据父产品id，查询子产品的设备
export const queryDeviceByParentProductId = params => {
  return http.get(AUTH + `/device/no-page/queryDeviceByParentProductId`, params, { loading: false })
}

// 设备查询
export const getAdvice= (productId) => {
  return http.get<any>( AUTH + `/device/no-page/query`, productId, { loading: false })
}

// 获取设备子设备
export const getDevicetChild = (parentDeviceId?:any) => {
  return http.get<any>( AUTH + `/device/no-page/queryDeviceByParentId`, parentDeviceId, { loading:false });
}