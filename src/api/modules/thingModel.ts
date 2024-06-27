import { ThingModel } from "@/api/interface/index";
import { AUTH } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 物模型模块
 */
// 获取物模型列表
export const getThingModelListApi = (params?: { searchText: string }) => {
  return http.get<ThingModel.Response[]>(AUTH + `/thingsModel/query`, params, { loading: false });
};
// 查询未被产品使用的物模型  不分页
export const getThingModelnoSelectQueryList = (params?: { searchText: string }) => {
  return http.get<ThingModel.Response[]>(AUTH + `/thingsModel/no-page/noSelectQuery`, params, { loading: false });
};  
// 获取物模型无分页列表
export const getThingModelNopage = (params?: { searchText: string }) => {
  return http.get<ThingModel.Response[]>(AUTH + `/thingsModel/no-page/query`, params, { loading: false });
};
// 获取物模型详情
export const getThingModelDetailApi = (params: Pick<ThingModel.Response, "id">) => {
  return http.get<ThingModel.Response>(AUTH + `/thingsModel/detail`, params, { loading: false });
};
// 新增物模型
export const addThingModel = (params: ThingModel.Base) => {
  return http.post<ThingModel.Response>(AUTH + `/thingsModel/add`, params, { loading: false });
};
// 编辑物模型
export const editThingModel = (params: ThingModel.Update) => {
  return http.post<ThingModel.Response>(AUTH + `/thingsModel/edit`, params, { loading: false });
};
// 删除物模型
export const deleteThingModelApi = (params: string[]) => {
  return http.post(AUTH + `/thingsModel/delete`, params, { loading: false });
};

/**
 * 物模型属性
 */
//无分页列表
export const getThingModelPropsNopage = params => {
  return http.get<ThingModel.Properties[]>(AUTH + `/thingsModel/property/no-page/query`, params, { loading: false });
};
// 新增
export const addThingModelProps = (params: ThingModel.Properties) => {
  return http.post(AUTH + `/thingsModel/property/add`, params, { loading: false });
};
// 编辑
export const editThingModelProps = (params: ThingModel.Properties) => {
  return http.post(AUTH + `/thingsModel/property/edit`, params, { loading: false });
};
// 删除
export const deleteThingModelProps = (params: ThingModel.Properties) => {
  return http.post(AUTH + `/thingsModel/property/delete`, params, { loading: false });
};

/**
 * 物模型服务
 */
//无分页列表
export const getThingModelServiceNopage = params => {
  return http.get<ThingModel.Server[]>(AUTH + `/thingsModel/function/no-page/query`, params, { loading: false });
};
// 新增
export const addThingModelService = (params: ThingModel.Server) => {
  return http.post<ThingModel.Response>(AUTH + `/thingsModel/function/add`, params, { loading: false });
};
// 编辑
export const editThingModelService = (params: ThingModel.Server) => {
  return http.post<ThingModel.Response>(AUTH + `/thingsModel/function/edit`, params, { loading: false });
};
// 删除
export const deleteThingModelService = (params: ThingModel.Server) => {
  return http.post<ThingModel.Response>(AUTH + `/thingsModel/function/delete`, params, { loading: false });
};
// 获取组件
export const getComponent = (params: { thingId } ) => {
  return http.get<any[]>(AUTH + `/netComponent/no-page/queryByThingId`,params, {})
}

/**
 * 物模型事件
 */
//无分页列表
export const getThingModelEventNopage = (params?: { searchText: string }) => {
  return http.get<ThingModel.Event[]>(AUTH + `/thingsModel/events/no-page/query`, params, { loading: false });
};
// 新增
export const addThingModelEvent = (params: ThingModel.Event) => {
  return http.post(AUTH + `/thingsModel/events/add`, params, { loading: false });
};
// 编辑
export const editThingModelEvent = (params: ThingModel.Event) => {
  return http.post(AUTH + `/thingsModel/events/edit`, params, { loading: false });
};
// 删除
export const deleteThingModelEvent = (params: ThingModel.Event) => {
  return http.post(AUTH + `/thingsModel/events/delete`, params, { loading: false });
};
