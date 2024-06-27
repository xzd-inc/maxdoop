import { Project } from "@/api/interface/index";
import { AUTH } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 项目模块
 */
// 获取项目列表
export const getProjectListApi = (params?: { searchText: string }) => {
  return http.get<Project.Response>(AUTH + `/project/query`, params, { loading: false });
};
// 获取项目详情
export const getProjectDetailApi = params => {
  return http.get<Project.Response>(AUTH + `/project/detail`, params, { loading: false });
};
// 新增项目
export const addProject = params => {
  return http.post<Project.Response>(AUTH + `/project/add`, params, { loading: false });
};
// 编辑项目
export const editProject = params => {
  return http.post<Project.Response>(AUTH + `/project/edit`, params, { loading: false });
};
// 删除项目
export const deleteProjectApi = params => {
  return http.post(AUTH + `/project/delete`, params, { loading: false });
};
// 修改项目状态
export const editProjectStatus = params => {
  return http.post(AUTH + `/project/editStatus`, params, { loading: false });
};
// 根据项目id获取项目拥有的菜单
export const getCodeByProjectId = params => {
  return http.get(AUTH + `/menu/getCodeByProjectId`, params, { loading: false });
};
// 设置项目管理员
export const setProjectAdminApi = params => {
  return http.post(AUTH + `/project/setAdmin`, params, { loading: false });
};
// 解绑项目用户
export const unbindProjectUserApi = params => {
  return http.post(AUTH + `/project/unbindUser`, params, { loading: false });
};
// 分配项目用户
export const bindProjectUserApi = params => {
  return http.post(AUTH + `/project/bindUser`, params, { loading: false });
};
