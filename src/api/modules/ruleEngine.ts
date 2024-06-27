import { ruleEngine } from "@/api/interface/index";
import { AUTH } from "@/api/config/servicePort";
import http from "@/api";

/**
 * 规则引擎
 */
// 获取规则引擎列表
export const getRuleEngineList = (params?: { searchText: string }) => {
  return http.get<ruleEngine.linkage[]>(AUTH + `/rule/query`, params, {
    loading: false })
};

// 新增
export const addRuleEngine = (params?: ruleEngine.linkage) => {
  return http.post< ruleEngine.linkage>(AUTH + `/rule/add`, params, { Loading: false })
}

// 编辑
export const editRuleEngine = (params?: ruleEngine.linkage) => {
  return http.post<ruleEngine.linkage>(AUTH + `/rule/edit`, params, { loading: false })
}

// 详情
export const detailRuleEngine = (params?: ruleEngine.linkage) => {
  return http.get<any>(AUTH + `/rule/detail`, params, { loading: false })
}

// 产品查询
export const getProduct = (params?: { searchText: string }) => {
  return http.get<any>(AUTH + `/product/no-page/query`, params, { loading: false }) 
}

// 设备查询
export const getAdvice= (productId) => {
  return http.get<any>( AUTH + `/device/no-page/query`, { productId }, { loading: false })
}

// 查询服务
export const getServe = (thingId) => {
  return http.get<any>(AUTH + `/thingsModel/function/no-page/query`, { thingId }, { loading: false })
}

// 详情--手动执行
export const handExecute = (params) => {
  return http.post<any>(AUTH + `/rule/manualTrigger`, params, { loading: false })
}

// 添加执行器
export const addActuator = () => {
  return http.post<any>(AUTH + `/rule/addRuleExecutors`, {}, { loading: false })
}

// 添加执行器--手动执行
export const addHandActuator = (params) => {
  return http.post<any>(AUTH + `/rule/addRuleExecutors`, params, { loading: false })
}

// 删除执行器--手动执行
export const delHandActuator = (params) => {
  return http.post<any>(AUTH + `/rule/rule-executor/delete`, params, { loading: false })
}

export const getFunctionDetail = (params) => {
  return http.get<any>(AUTH + `/thingsModel/function/detail`, params, { loading: false })
}

// 添加执行器(条件)
export const getActuator = () => {
  return http.post<any>(AUTH + `/rule/addRuleExecutors`,{} ,{ loading: false })
}

// 新增触发器
 export const addTrigger = (params) => {
  return http.post<any>(AUTH + `/rule/addRuleTrigger`, params, { loading:false })
 }

 // 删除规则触发器
 export const deleteTrigger =(params) => {
  return http.post<any>(AUTH + `/rule/deleteRuleTrigger`, params, { loading:false })
 }