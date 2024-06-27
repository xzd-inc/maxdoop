import { Alarm } from "@/api/interface/index";
import { AUTH } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 报警模块
 */
// 获取报警列表
export const getAlarmParamsListApi = (params?: { searchText: string }) => {
  return http.get<Alarm.AlarmParams[]>(AUTH + `/alarmConfig/query`, params, {
    loading: false })
};
// 新增报警
export const addAlarmParams = (params?: Alarm.AlarmParams) => {
  return http.post<Alarm.AlarmParams>(AUTH + `/alarmConfig/add`,params, { loading: false });
}

// 编辑报警
export const editAlarmParams = (params?: Alarm.AlarmParams) => {
  return http.post<Alarm.AlarmParams>(AUTH + `/alarmConfig/edit`, params, { loading: false });
};
// 删除报警
export const deleteAlarmParams = params => {
  return http.post(AUTH + `/alarmConfig/delete`, params, { loading: false });
};
// 报警详情
export const detailAlarmParams = params => {
  return http.get(AUTH + `/alarmConfig/detail`, params, { loading: false });
};

/**
 * @name: 告警记录
 */
export const alarmHistory = (params?: { searchText: string }) => {
  return http.get<Alarm.AlarmParams[]>(AUTH + `/alarmRecord/query`, params, {
    Loading: false })
};