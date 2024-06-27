import { fa } from "element-plus/es/locale";
import { AUTH } from "../config/servicePort";
import http from '@/api';

/**
 *  bsp首页
 */

// 获取报警
export const getAlarmCount = () => {
  return http.get(AUTH + `/homePage/getAlarmInfo`,{}, { loading:false })
}

// 获取日志
export const getLogCount = () => {
  return http.get( AUTH + `/homePage/getLogInfo`, {}, { loading:false } )
}

// 日志折线图
export const getLine = (params: {startDate: string; endDate: string }) => {
  return http.get(AUTH + `/homePage/getLogSumLineChart`, params, { loading:false })
}

// 获取通知数
export const getInfoCount = () => {
  return http.get(AUTH + `/homePage/getNotifyInfo`, {}, { loading:false })
}
// 查询用户拥有的项目数
export const retrieveOperationalProjectCount = () => {
  return http.get(AUTH +`/home/retrieveOperationalProjectCount`, {} ,{ loading:false })
}

/**
 *  app
 */

// 查询历史操作记录
export const getHistoryList = () => {
  return http.get(AUTH + `/home/queryByProjectFromInfluxdb`, {} ,{ loading: false })
}