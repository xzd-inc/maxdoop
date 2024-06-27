import { Login, Menus } from "@/api/interface/index";
import { AUTH, UNAUTH } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 登录模块
 */
// 用户登录
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>(UNAUTH + `/login`, {}, { loading: false, params }); // 正常 post json 请求  ==>  application/json
};

// 获取当前项目
export const getCurrentProject = () => {
  return http.get(AUTH + `/userSession/getCurrentSelectedProject`, {}, { loading: false });
};
// 设置项目
export const setCurrentProject = params => {
  return http.post(AUTH + `/userSession/setCurrentSelectedProject`, params, { loading: false });
};

// 获取菜单列表
export const getAuthMenuListApi = (params: Login.ReqGetMenusForm) => {
  return http.get<Menus.Response[]>(AUTH + `/menu/userMenuTree`, params, { loading: false });
};

// 获取按钮权限
export const getAuthButtonListApi = () => {
  return http.get<Login.ResAuthButtons>(AUTH + `/menu/userMenuButton`, {}, { loading: false });
};

// 用户退出登录
export const logoutApi = () => {
  return http.post(AUTH + `/logout`);
};
