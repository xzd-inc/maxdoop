import { AUTH } from "@/api/config/servicePort";
import http from '@/api';

/**
 * 获取项目，并根据type进行分组
 */
export const getOperatableList = () => {
  return http.get(AUTH + `/homePage/getProjectsGroupByType`, {}, {
    loading: false
  })
};
/**
 * 选择需要编辑的项目
 */
export const editOperatable = (projectId) => {
  return http.post(AUTH + `/homePage/selectProjectForEditing`, { projectId: projectId }, { loading: false })
}