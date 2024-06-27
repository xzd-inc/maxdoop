import { AUTH } from "@/api/config/servicePort";
import http from "@/api";
import { Log } from "@/api/interface";

/**
 * @name 日志管理
 */

// 操作日志列表
export const getOperationList = params => {
  return http.get<Log.Response[]>(AUTH + `/logOperation/query`, params);
};
// 导出操作日志列表
export const exportOperationList = params => {
  return http.downloadByGet(AUTH + `/logOperation/export`, params);
};

// 异常日志列表
export const getExceptionLogList = params => {
  return http.get<Log.Exception[]>(AUTH + `/logError/query`, params);
};
// 导出异常日志列表
export const exportExceptionLog = params => {
  return http.downloadByGet(AUTH + `/logError/export`, params);
};

// 登录日志列表
export const getLoginLogList = params => {
  return http.get<Log.Response[]>(AUTH + `/logLogin/query`, params);
};
// 导出登录日志列表
export const exportLoginLogList = params => {
  return http.downloadByGet(AUTH + `/logLogin/export`, params);
};
