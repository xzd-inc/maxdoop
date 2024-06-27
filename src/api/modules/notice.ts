import { Notice } from "@/api/interface/index";
import { AUTH } from "@/api/config/servicePort";
import http from "@/api";
import { fa } from "element-plus/es/locale";

/**
 * @name 通知模块
 */
// 获取通知列表
export const getNoticeParamsList = (params?: { searchText: string }) => {
  return http.get<Notice.NoticeParams[]>(AUTH + `/notifyConfig/query`, params, {
    Loading: false })
};
// 新增通知
export const addNoticeParams = (params?: Notice.NoticeParams) => {
  return http.post<Notice.NoticeParams>(AUTH + `/notifyConfig/add`,params, { loading: false });
}

// 编辑通知
export const editNoticeParams = (params?: Notice.NoticeParams) => {
  return http.post<Notice.NoticeParams>(AUTH + `/notifyConfig/edit`, params, { loading: false });
};
// 删除通知
export const deleteNoticeParams = params => {
  return http.post(AUTH + `/notifyConfig/delete`, params, { loading: false });
};
// 通知详情
export const detailNoticeParams = params => {
  return http.get(AUTH + `/notifyConfig/detail`, params, { loading: false });
};

/**
 * @name: 模板
 */
// 获取模板列表
export const getTemplateList = (params?: { search: string }) => {
  return http.get<Notice.NoticeTempate[]>(AUTH + `/notifyTemplate/query`,params,{
    Loding: false
  })
}
// 新增模板
export const addNoticeTemplate =(params?:Notice.NoticeTempate) => {
  return http.post<Notice.NoticeTempate>(AUTH + `/notifyTemplate/add`, params, {
    loadign: false
  })
}
// 编辑模板
export const editNoticeTemplate = (params?:Notice.NoticeTempate) => {
  return http.post<Notice.NoticeTempate>(AUTH + `/notifyTemplate/edit` ,params, {
    loading: false
  })
}
//删除模板
export const deleteNoticeTemplate = params => {
  return http.post(AUTH + `/notifyTemplate/delete`, params, { loading: false });
};
// 通知模板详情
export const detailNoticeTemplate = params => {
  return http.get(AUTH + `/notifyTemplate/detail`, params, { loading: false });
};