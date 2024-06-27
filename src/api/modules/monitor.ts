import { AUTH } from "@/api/config/servicePort";
import http from '@/api';

/**
 * 视频列表
 */
export const getCamera = (params?:{ searchText: string, params: string, deviceUser:string ,startTime:string, endTime:string  }) => {
  return http.get(AUTH + `/camera/query`, params, {
    loading: false
  })
};
/**
 * 获取视频的播放链接
 */
export const getgetPlayUrl = params => {
  return http.get(AUTH + `/camera/getPlayUrl`, params, {
    loading: false
  })
};
/**
 * 设备详情
 */
export const getCameraDetail = params => {
  return http.get(AUTH + `/camera/detail`, params, {
    loading: false
  })
};