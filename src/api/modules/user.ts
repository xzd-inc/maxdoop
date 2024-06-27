import { ResPage, User } from "@/api/interface/index";
import { AUTH } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 用户管理模块
 */
// 获取项目用户列表
export const getUserList = (params: User.ReqUserParams) => {
  return http.get<ResPage<User.ResUserList>>(AUTH + `/user/query`, params);
};
// 获取所有用户列表
export const getAllUserList = (params: User.ReqUserParams) => {
  return http.get<ResPage<User.ResUserList>>(AUTH + `/user/queryAllUser`, params);
};
// 获取项目的用户列表
export const getUserByProjectIdApi = (params: { projectId: string }) => {
  return http.get(AUTH + `/user/getUserByProjectId`, params);
};
// 获取用户信息
export const getUserInfo = () => {
  return http.get(AUTH + `/user/getCurrentUserInfo`);
};
// 获取用户详情
export const getUserDetail = params => {
  return http.get(AUTH + `/user/detail`, {}, { params });
};

// 获取树形用户列表
export const getUserTreeList = (params: User.ReqUserParams) => {
  return http.post<ResPage<User.ResUserList>>(AUTH + `/user/tree/list`, params);
};

// 新增用户
export const addUser = params => {
  return http.post(AUTH + `/user/add`, params);
};

// 编辑用户
export const editUser = params => {
  return http.post(AUTH + `/user/edit`, params);
};

// 删除用户
export const deleteUserApi = params => {
  return http.post(AUTH + `/user/delete`, params);
};

// 切换用户状态
export const changeUserStatus = (params: { id: string; status: number }) => {
  return http.post(AUTH + `/user/change`, params);
};

// 重置用户密码
export const resetUserPassWord = (params: { id: string }) => {
  return http.post(AUTH + `/user/rest_password`, params);
};

// 导出用户数据
export const exportUserInfo = (params: User.ReqUserParams) => {
  return http.download(AUTH + `/user/export`, params);
};

// 获取用户角色字典
export const getUserRole = () => {
  return http.get<User.ResRole[]>(AUTH + `/user/role`);
};

// 获取用户二维码
export const getUserCode = (params: any) => {
  return http.get<any>(AUTH + `/getwxacodeunlimit`,params);
}