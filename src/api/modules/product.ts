import { Product } from "@/api/interface/index";
import { AUTH } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 产品模块
 */
// 获取产品列表
export const getProductListApi = (params?: any) => {
  return http.get<Product.Response[]>(AUTH + `/product/query`, params, { loading: false });
};
// 获取产品列表不分页
export const getProductNopage = (params?: { searchText: string }) => {
  return http.get<Product.Response[]>(AUTH + `/product/no-page/query`, params, { loading: false });
};
// 获取产品详情
export const getProductDetailApi = (params: any) => {
  return http.get<any>(AUTH + `/product/detail`, params, { loading: true });
};
// 新增产品
export const addProduct = (params: Product.Base) => {
  return http.post<Product.Response>(AUTH + `/product/add`, params, { loading: false });
};
// 编辑产品
export const editProduct = (params: Product.Update) => {
  return http.post<Product.Response>(AUTH + `/product/edit`, params, { loading: false });
};
// 删除产品
export const deleteProductApi = (params: string[]) => {
  return http.post(AUTH + `/product/delete`, params, { loading: false });
};
// 修改产品状态
export const editProductStatus = params => {
  return http.post(AUTH + `/product/ediStatus`, params, { loading: false });
};

// 获取产品列表(networkTypes=0&networkTypes=1)
export const getProductList = () => {
  return http.get<any[]>(AUTH + `/product/query?networkTypes=0&networkTypes=1`, {}, { loading: false });
};