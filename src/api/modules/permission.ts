import { AUTH } from "@/api/config/servicePort";
import http from "@/api";
import { Permission } from "@/api/interface";

/**
 * @name 权限管理
 */

// 权限列表
export const getPermission = () => {
  return http.get(AUTH + `/userSession/getCurrentSelectedProject`, {}, { loading: false });
};
// 权限列表
export const getAllPermissionOfEnabledApi = () => {
  return http.get(AUTH + `/permission/getEnabledPermissions`, {}, { loading: false });
};
// 权限列表
export const getPermissionList = () => {
  return http.get<Permission.Response[]>(AUTH + `/permission/query`, {});
};
// 新建权限
export const addPermission = (param: Permission.Base) => {
  return http.post(AUTH + `/permission/add`, param, { loading: false });
};
// 编辑权限
export const editPermission = (param: Permission.Response) => {
  return http.post(AUTH + `/permission/edit`, param, { loading: false });
};
// 删除权限
export const deletePermission = param => {
  return http.post(AUTH + `/permission/delete`, param, { loading: false });
};
// 修改权限状态
export const editPermissionStatus = param => {
  return http.post(AUTH + `/permission/editStatus`, param, { loading: false });
};
