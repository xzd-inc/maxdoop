import { Menus } from "@/api/interface/index";
import { AUTH } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 菜单模块
 */
// 获取菜单列表
export const getMenusListApi = (params?: { searchText: string }) => {
  return http.get<Menus.Response>(AUTH + `/menu/list`, params, { loading: false });
};
// 获取菜单详情
export const getMenusDetailApi = params => {
  return http.get<Menus.Response>(AUTH + `/menu/detail`, params, { loading: false });
};
// 获取菜单树
export const getMenusTreeApi = (params?: { searchText: string }) => {
  return http.get<Menus.Response[]>(AUTH + `/menu/menuTree`, params, { loading: false });
};
// 新增菜单
export const addMenus = params => {
  return http.post<Menus.Response>(AUTH + `/menu/add`, params, { loading: false });
};
// 编辑菜单
export const editMenus = params => {
  return http.post<Menus.Response>(AUTH + `/menu/edit`, params, { loading: false });
};
// 删除菜单
export const deleteMenuApi = params => {
  return http.post(AUTH + `/menu/delete`, params, { loading: false });
};
// 修改菜单状态
export const editMenuStatus = params => {
  return http.post(AUTH + `/menu/editStatus`, params, { loading: false });
};
