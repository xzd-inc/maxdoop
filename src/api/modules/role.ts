import { Role } from "@/api/interface/index";
import { AUTH } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 角色管理模块
 */
// 获取角色列表
export const getRoleList = params => {
  return http.get(AUTH + `/role/query`, {}, { params });
};
// 获取所有角色列表
export const getAllRoleList = () => {
  return http.get(AUTH + `/role/findList`);
};
// 获取角色详情
export const getRoleDetail = params => {
  return http.get(AUTH + `/role/detail`, {}, { params });
};
// 获取角色的菜单权限
export const getMenuByRoleId = params => {
  return http.get(AUTH + `/menu/grantTree`, {}, { params });
};
// 新增角色
export const addRoleApi = (params: Role.Base) => {
  return http.post(AUTH + `/role/add`, params);
};
// 修改角色
export const editRoleApi = (params: Role.Response) => {
  return http.post(AUTH + `/role/edit`, params);
};
// 删除角色
export const deleteRoleApi = (params: Role.Response) => {
  return http.post(AUTH + `/role/delete`, params);
};
// 分配角色权限
export const saveRolePermission = (params: { roleId: any; permission: any }) => {
  const { permission, roleId } = params;
  return http.post(AUTH + `/role/grant`, permission, { params: { roleId } });
};
