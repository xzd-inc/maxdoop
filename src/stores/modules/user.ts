import { defineStore } from "pinia";
import { UserState } from "@/stores/interface";
import piniaPersistConfig from "@/stores/helper/persist";
import { getUserInfo } from "@/api/modules/user";

export const useUserStore = defineStore({
  id: "maxdoop-user",
  state: (): UserState => ({
    token: "",
    isLogin: false,
    userInfo: {
      userName: "",
      account: "",
      projectDtos: []
    }
  }),
  getters: {},
  actions: {
    // 是否已经登录
    setLogin(login: boolean) {
      this.isLogin = login;
    },
    // Set setUserInfo
    setUserInfo(userInfo: UserState["userInfo"]) {
      this.userInfo = userInfo;
    },
    async getUserInfo() {
      const { data } = await getUserInfo();
      this.userInfo = data;
    }
  },
  persist: piniaPersistConfig("maxdoop-user")
});
