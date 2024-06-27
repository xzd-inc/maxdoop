import { AUTH } from "@/api/config/servicePort";
import http from "@/api";
import { Dict } from "@/api/interface";

/**
 * @name 字典管理
 */

// 字典列表
export const getDictList = () => {
  return http.get<Dict.Source[]>(AUTH + `/dictIndex/no-page/query`, {});
};
// 新建字典
export const addDict = (param: Dict.CreateDict) => {
  return http.post(AUTH + `/dictIndex/add`, param, { loading: false });
};
// 编辑字典
export const editDict = (param: Dict.Source) => {
  return http.post(AUTH + `/dictIndex/edit`, param, { loading: false });
};
// 删除字典
export const deleteDict = param => {
  return http.post(AUTH + `/dictIndex/delete`, param, { loading: false });
};

/**
 * 字典项
 */
// 列表
export const getDictItemList = param => {
  return http.get<Dict.DictItem[]>(AUTH + `/dict/no-page/query`, param, { loading: false });
};
// 新建
export const addDictItem = (param: Dict.CreateDictItem) => {
  return http.post(AUTH + `/dict/add`, param, { loading: false });
};
// 编辑
export const editDictItem = (param: Dict.EditDictItem) => {
  return http.post(AUTH + `/dict/edit`, param, { loading: false });
};
// 删除
export const deleteDictItem = param => {
  return http.post(AUTH + `/dict/delete`, param, { loading: false });
};
