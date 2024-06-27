import { RouteRecordRaw } from "vue-router";
import { HOME_URL, LOGIN_URL } from "@/config";

export const staticMenus = [
  {
    path: HOME_URL,
    name: "home",
    meta: {
      icon: "HomeFilled",
      title: "首页",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: true,
      isKeepAlive: true
    },
    component: () => import("@/views/home/index.vue")
  },
  // {
  //   path: "/ruleEngine",
  //   name: "ruleEngine",
  //   redirect: "/redirect/linkage",
  //   meta: {
  //     icon: "Tools",
  //     title: "规则引擎",
  //     isLink: "",
  //     isHide: false,
  //     isFull: false,
  //     isAffix: false,
  //     isKeepAlive: true,
  //   },
  //   children :[
  //     {
  //       path: "/ruleEngine/linkage",
  //       name: "linkage",
  //       meta: {
  //         icon: "Tools",
  //         title: "场景联动",
  //         isLink: "",
  //         isFull: false,
  //         isAffix: false,
  //         isHide: false,
  //         isKeepAlive: true
  //       },
  //       component: () => import("@/views/ruleEngine/linkage/index.vue")
  //     },
  //     {
  //       path: "/ruleEngine/linkage/detail/:id",
  //       name: "linkageDetail",
  //       meta: {
  //         icon: "Tools",
  //         title: "场景联动详情",
  //         isLink: "",
  //         isFull: false,
  //         isAffix: false,
  //         isHide: true,
  //         isKeepAlive: true,
  //       },
  //       component: () => import("@/views/ruleEngine/linkage/detail.vue")
  //     }
  //   ]
  // },
  // {
  //   path: "/alarm",
  //   name: "alarm",
  //   redirect:"/alarm/aConfig",
  //   meta: {
  //     icon: "Tools",
  //     title: "告警管理",
  //     isLink: "",
  //     isHide: false,
  //     isFull: false,
  //     isAffix: false,
  //     isKeepAlive: true
  //   },
  //   children: [
  //     {
  //       path: "/alarm/aConfig",
  //       name: "aConfig",
  //       meta: {
  //         icon: "Tools",
  //         title: "告警配置",
  //         isLink: "",
  //         isHide: false,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       },
  //       component: () => import("@/views/alarm/aConfig/index.vue")
  //     },
  //     {
  //       path: "/alarm/aConfig/detail/:id",
  //       name: "aConfigDetail",
  //       meta: {
  //         icon: "Tools",
  //         title: "告警详情",
  //         activeMune:"/alarm/aConfig",
  //         isLink: "",
  //         isHide: true,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       },
  //       component: () => import("@/views/alarm/aConfig/detail.vue")
  //     },
  //     {
  //       path: "/alarm/histoty",
  //       name: "histoty",
  //       meta: {
  //         icon: "Tools",
  //         title: "告警记录",
  //         isLink: "",
  //         isHide: false,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true  
  //       },
  //       component: () => import("@/views/alarm/histoty/index.vue")
  //     },
  //   ]
  // },
  // {
  //   path: "/notice",
  //   name: "notice",
  //   redirect:"/notice/nConfig",
  //   meta: {
  //     icon: "Tools",
  //     title: "通知管理",
  //     isLink: "",
  //     isHide: false,
  //     isFull: false,
  //     isAffix: false,
  //     isKeepAlive: true
  //   },
  //   children: [
  //     {
  //       path: "/notice/nConfig",
  //       name: "nConfig",
  //       meta: {
  //         icon: "Tools",
  //         title: "通知配置",
  //         isLink: "",
  //         isHide: false,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       },
  //       component: () => import("@/views/notice/nConfig/index.vue")
  //     },
  //     {
  //       path: "/notice/nConfig/detail/:id",
  //       name: "nConfigDetail",
  //       meta: {
  //         icon: "Tools",
  //         title: "通知详情",
  //         activeMune:"/notice/nConfig",
  //         isLink: "",
  //         isHide: true, 
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       },
  //       component: () => import("@/views/notice/nConfig/detail.vue")
  //     },
  //     {
  //       path: "/notice/template",
  //       name: "template",
  //       meta: {
  //         icon: "Tools",
  //         title: "通知模板",
  //         isLink: "",
  //         isHide: false,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       },
  //       component: () => import("@/views/notice/template/index.vue")
  //     },
  //     {
  //       path: "/notice/template/detail/:id",
  //       name: "templateDetail",
  //       meta: {
  //         icon: "Tools",
  //         title: "模板详情",
  //         activeMune:"/notice/template",
  //         isLink: "",
  //         isHide: true, 
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       },
  //       component: () => import("@/views/notice/template/detail.vue")
  //     }
  //   ]
  // },
  // {
  //   path: "/device",
  //   name: "device",
  //   redirect: "/deviceManage/product",
  //   meta: {
  //     icon: "Cpu",
  //     title: "设备管理",
  //     isLink: "",
  //     isHide: false,
  //     isFull: false,
  //     isAffix: false,
  //     isKeepAlive: true
  //   },
  //   children: [
  //     {
  //       path: "/deviceManage/product",
  //       name: "product",
  //       meta: {
  //         icon: "Tools",
  //         title: "产品管理",
  //         isLink: "",
  //         isHide: false,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       },
  //       component: () => import("@/views/deviceManage/product/index.vue")
  //     },
  //     {
  //       path: "/deviceManage/product/detail/:id",
  //       name: "productDetail",
  //       meta: {
  //         icon: "Tools",
  //         title: "产品详情",
  //         activeMenu: "/deviceManage/product",
  //         isLink: "",
  //         isHide: true,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: false
  //       },
  //       component: () => import("@/views/deviceManage/product/detail.vue")
  //     },
  //     {
  //       path: "/deviceManage/device",
  //       name: "device",
  //       meta: {
  //         icon: "Tools",
  //         title: "设备维护",
  //         isLink: "",
  //         isHide: false,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       },
  //       component: () => import("@/views/deviceManage/device/index.vue")
  //     },
  //     {
  //       path: "/deviceManage/device/detail/:id",
  //       name: "deviceDetail",
  //       meta: {
  //         icon: "Tools",
  //         title: "设备详情",
  //         activeMenu: "/deviceManage/device",
  //         isLink: "",
  //         isHide: true,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: false
  //       },
  //       component: () => import("@/views/deviceManage/device/detail.vue")
  //     }
  //   ]
  // },
  // {
  //   path: "/access",
  //   name: "access",
  //   redirect: "/access/networkManage",
  //   meta: {
  //     icon: "Tools",
  //     title: "接入管理",
  //     isLink: "",
  //     isHide: false,
  //     isFull: false,
  //     isAffix: false,
  //     isKeepAlive: true
  //   },
  //   children: [
  //     {
  //       path: "/access/networkManage",
  //       name: "networkManage",
  //       meta: {
  //         icon: "Tools",
  //         title: "网络适配器",
  //         isLink: "",
  //         isHide: false,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       },
  //       component: () => import("@/views/accessManage/networkAdapter/index.vue")
  //     },
  //     {
  //       path: "/access/networkManage/detail/:id",
  //       name: "networkManageDetail",
  //       meta: {
  //         icon: "Tools",
  //         title: "适配器详情",
  //         activeMenu: "/access/networkManage",
  //         isLink: "",
  //         isHide: true,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       },
  //       component: () => import("@/views/accessManage/networkAdapter/detail.vue")
  //     },
  //     {
  //       path: "/access/protocolManage",
  //       name: "protocolManage",
  //       meta: {
  //         icon: "Tools",
  //         title: "协议管理",
  //         isLink: "",
  //         isHide: false,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       },
  //       component: () => import("@/views/accessManage/protocol/index.vue")
  //     },
  //     {
  //       path: "/access/protocolManage/detail/:id",
  //       name: "protocolManageDetail",
  //       meta: {
  //         icon: "Tools",
  //         title: "协议详情",
  //         activeMenu: "/access/protocolManage",
  //         isLink: "",
  //         isHide: true,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       },
  //       component: () => import("@/views/accessManage/protocol/detail.vue")
  //     },
  //     {
  //       path: "/access/thinkModel/detail/:id",
  //       name: "thinkModelDetail",
  //       meta: {
  //         icon: "Tools",
  //         title: "物模型详情",
  //         activeMenu: "/access/thinkModel",
  //         isLink: "",
  //         isHide: true,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       },
  //       component: () => import("@/views/accessManage/thingModel/detail.vue")
  //     },
  //     {
  //       path: "/access/thinkModel",
  //       name: "thinkModel",
  //       meta: {
  //         icon: "Tools",
  //         title: "物模型",
  //         isLink: "",
  //         isHide: false,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       },
  //       component: () => import("@/views/accessManage/thingModel/index.vue")
  //     }
  //   ]
  // }
  // }
  // {
  //   path: "/log",
  //   name: "log",
  //   // redirect: "/log/operation",
  //   meta: {
  //     icon: "Tools",
  //     title: "系统日志",
  //     isLink: "",
  //     isHide: false,
  //     isFull: false,
  //     isAffix: false,
  //     isKeepAlive: true
  //   },
  //   children: [
  //     {
  //       path: "/log/login",
  //       name: "loginLog",
  //       component: () => import("@/views/system/log/LoginLog.vue"),
  //       meta: {
  //         icon: "Menu",
  //         title: "登录日志",
  //         isLink: "",
  //         isHide: false,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       }
  //     },
  //     {
  //       path: "/log/exception",
  //       name: "exceptionLog",
  //       component: () => import("@/views/system/log/ExceptionLog.vue"),
  //       meta: {
  //         icon: "Menu",
  //         title: "异常日志",
  //         isLink: "",
  //         isHide: false,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       }
  //     },
  //     {
  //       path: "/log/operation",
  //       name: "operationLog",
  //       component: () => import("@/views/system/log/OperationLog.vue"),
  //       meta: {
  //         icon: "Menu",
  //         title: "操作日志",
  //         isLink: "",
  //         isHide: false,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       }
  //     }
  //   ]
  // }
  // {
  //   path: "/dict",
  //   name: "dict",
  //   meta: {
  //     icon: "Tickets",
  //     title: "字典管理",
  //     isLink: "",
  //     isHide: false,
  //     isFull: false,
  //     isAffix: false,
  //     isKeepAlive: true
  //   },
  //   component: () => import("@/views/system/dictManage/index.vue")
  // }
  // {
  //   path: "/system",
  //   name: "system",
  //   redirect: "/system/accountManage",
  //   meta: {
  //     icon: "Tools",
  //     title: "系统管理",
  //     isLink: "",
  //     isHide: false,
  //     isFull: false,
  //     isAffix: false,
  //     isKeepAlive: true
  //   },
  //   children: [
  //     {
  //       path: "/system/accountManage",
  //       name: "accountManage",
  //       component: () => import("@/views/system/accountManage/index.vue"),
  //       meta: {
  //         icon: "Menu",
  //         title: "账号管理",
  //         isLink: "",
  //         isHide: false,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       }
  //     },
  //     {
  //       path: "/system/accountManage/detail/:id",
  //       name: "accountManageDetail",
  //       component: () => import("@/views/system/accountManage/detail.vue"),
  //       meta: {
  //         icon: "Menu",
  //         title: "账号详情",
  //         activeMenu: "/system/accountManage",
  //         isLink: "",
  //         isHide: true,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       }
  //     },
  //     {
  //       path: "/system/roleManage",
  //       name: "roleManage",
  //       component: () => import("@/views/system/roleManage/index.vue"),
  //       meta: {
  //         icon: "Menu",
  //         title: "角色管理",
  //         isLink: "",
  //         isHide: false,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       }
  //     },
  //     {
  //       path: "/system/roleManage/detail/:id",
  //       name: "roleManageDetail",
  //       component: () => import("@/views/system/roleManage/detail.vue"),
  //       meta: {
  //         icon: "Menu",
  //         title: "角色详情",
  //         activeMenu: "/system/roleManage",
  //         isLink: "",
  //         isHide: true,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       }
  //     },
  //     {
  //       path: "/system/permissionManage",
  //       name: "permissionManage",
  //       component: () => import("@/views/system/permissionManage/index.vue"),
  //       meta: {
  //         icon: "Menu",
  //         title: "权限管理",
  //         isLink: "",
  //         isHide: false,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       }
  //     },
  //     {
  //       path: "/system/menuMange",
  //       name: "menuMange",
  //       component: () => import("@/views/system/menuMange/index.vue"),
  //       meta: {
  //         icon: "Menu",
  //         title: "菜单管理",
  //         isLink: "",
  //         isHide: false,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       }
  //     },
  //     {
  //       path: "/system/dictManage",
  //       name: "dictManage",
  //       component: () => import("@/views/system/dictManage/index.vue"),
  //       meta: {
  //         icon: "Menu",
  //         title: "字典管理",
  //         isLink: "",
  //         isHide: false,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       }
  //     },
  //     {
  //       path: "/system/systemLog",
  //       name: "systemLog",
  //       component: () => import("@/views/system/systemLog/index.vue"),
  //       meta: {
  //         icon: "Menu",
  //         title: "系统日志",
  //         isLink: "",
  //         isHide: false,
  //         isFull: false,
  //         isAffix: false,
  //         isKeepAlive: true
  //       }
  //     }
  //   ]
  // }
];

/**
 * staticRouter (静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: HOME_URL
  },
  {
    path: LOGIN_URL,
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/layout",
    name: "layout",
    component: () => import("@/layouts/index.vue"),
    // component: () => import("@/layouts/indexAsync.vue"),
    redirect: HOME_URL,
    children: [...staticMenus]
  }
];

/**
 * errorRouter (错误页面路由)
 */
export const errorRouter = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/components/ErrorMessage/403.vue"),
    meta: {
      title: "403页面"
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/components/ErrorMessage/404.vue"),
    meta: {
      title: "404页面"
    }
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/components/ErrorMessage/500.vue"),
    meta: {
      title: "500页面"
    }
  },
  // Resolve refresh page, route warnings
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/components/ErrorMessage/404.vue")
  }
];
