import { Protocol } from "@/api/interface/index";
import { AUTH } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 协议模块
 */
// 获取协议列表
export const getProtocolListApi = (params?: { searchText: string }) => {
  return http.get<Protocol.Response[]>(AUTH + `/netProtocol/query`, params, { loading: false });
};
// 获取协议不分页列表
export const getProtocolNopage = (params?: { searchText: string }) => {
  return http.get<Protocol.Response[]>(AUTH + `/netProtocol/no-page/query`, params, { loading: false });
};
// 获取协议详情
export const getProtocolDetailApi = (params: Pick<Protocol.Response, "id">) => {
  return http.get<Protocol.Response>(AUTH + `/netProtocol/detail`, params, { loading: false });
};
// 新增协议
export const addProtocol = (params: Protocol.Base) => {
  return http.post<Protocol.Response>(AUTH + `/netProtocol/add`, params, { loading: false });
};
// 编辑协议
export const editProtocol = (params: Protocol.Update) => {
  return http.post<Protocol.Response>(AUTH + `/netProtocol/edit`, params, { loading: false });
};
// 删除协议
export const deleteProtocolApi = params => {
  return http.post(AUTH + `/netProtocol/delete`, params, { loading: false });
};
