import { AUTH } from "@/api/config/servicePort";
import http from "@/api";

/**
 * 网络监控
 */
// 获取控制台地址
export const getConsoleURL = (params?: { searchText: string }) => {
  return http.get(AUTH + `/console/getConsole`, params, {
    loading: false })
};
