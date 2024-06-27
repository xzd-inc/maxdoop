import { Adapter } from "@/api/interface/index";
import { AUTH } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 适配器模块
 */
// 获取适配器列表
export const getAdapterListApi = (params?: { searchText: string }) => {
  return http.get<Adapter.Response[]>(AUTH + `/netComponent/query`, params, { loading: false });
};
// 获取适配器不分页列表
export const getAdapterNopage = (params?: { searchText: string }) => {
  return http.get<Adapter.Response[]>(AUTH + `/netComponent/no-page/query`, params, { loading: false });
};
// 获取适配器详情
export const getAdapterDetailApi = (params: any) => {
  return http.get<Adapter.Response>(AUTH + `/netComponent/detail`, params, { loading: false });
};
// 新增适配器
export const addAdapter = (params: Adapter.Base) => {
  return http.post<Adapter.Response>(AUTH + `/netComponent/add`, params, { loading: false });
};
// 编辑适配器
export const editAdapter = (params: any) => {
  return http.post<Adapter.Response>(AUTH + `/netComponent/edit`, params, { loading: false });
};
// 删除适配器
export const deleteAdapterApi = (params: string[]) => {
  return http.post(AUTH + `/netComponent/delete`, params, { loading: false });
};

// 获取不分页列表
export const getAdapterNopageList = (params?: { searchText: string }) => {
  return http.get<Adapter.Response[]>(AUTH + `/netComponent/no-page/noSelectQuery`, params, { loading: false });
};