import { Upload } from "@/api/interface/index";
import { AUTH, UNAUTH } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 文件上传模块
 */
// 图片上传
export const uploadFile = (params: FormData) => {
  return http.post<Upload.ResFileUrl>(UNAUTH + `/attachment/upload`, params, { cancel: false });
};

// 视频上传
export const uploadVideo = (params: FormData) => {
  return http.post<Upload.ResFileUrl>(AUTH + `/file/upload/video`, params, { cancel: false });
};

// 文件上传
export const upload = (params) => {
  return http.post(UNAUTH + '/attachmentInfo/upload', params, { cancel: false });
}
