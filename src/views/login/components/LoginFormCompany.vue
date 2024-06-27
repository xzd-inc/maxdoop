<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
    <div class="logion_title">
      <div style="margin-right: 5px"><img src="@/assets/images/user.png" /></div>
      <div>账号</div>
    </div>
    <el-form-item prop="account">
      <el-input v-model="loginForm.account" placeholder="请输入您的账号" input-style="">
        <!-- <template #prefix>
          <el-icon class="el-input__icon">
            <user />
          </el-icon>
        </template> -->
      </el-input>
    </el-form-item>
    <div class="logion_title">
      <div style="margin-right: 5px"><img src="@/assets/images/password.png" /></div>
      <div>密码</div>
    </div>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        type="password"
        placeholder="请输入您的密码"
        show-password
        autocomplete="new-password"
      >
        <!-- <template #prefix>
          <el-icon class="el-input__icon">
            <lock />
          </el-icon>
        </template> -->
      </el-input>
    </el-form-item>
    <div class="logion_title">
      <div style="margin-right: 5px"><img src="@/assets/images/code.png" /></div>
      <div>验证码</div>
    </div>
    <el-form-item prop="captcha">
      <el-input v-model="loginForm.captcha" type="captcha" placeholder="请关注公众号，回复【验证码】获取">
        <!-- <template #prefix>
          <el-icon class="el-input__icon">
            <Postcard />
          </el-icon>
        </template> -->
        <!-- <template #append>
          <el-tooltip effect="dark" content="点击图片更换验证码" placement="top">
            <img class="captcha" :src="captchaImg" alt="" @click="refreshCaptch" />
          </el-tooltip>
        </template> -->
         <template #append>
          <el-tooltip effect="light" content="请点击" placement="right">
            <template #content>
              <img src="@/assets/images/微信公众号.jpg" style="width: 100px;"/>
            </template>
            <div style="padding: 0 10px;"> 获取公众号</div>
          </el-tooltip>
        </template>
      </el-input>
      <!-- <div class="password_handle">
        <div>
          <span>
            <el-checkbox v-model="checked" label="记住密码" />
          </span>
        </div>
        <div class="password_forget">忘记密码？</div>
      </div> -->
    </el-form-item>
  </el-form>
  <div class="login_company_btn">
    <!-- <el-button :icon="CircleClose" round size="large" @click="resetForm(loginFormRef)"> {{ $t("login.reset") }} </el-button> -->
    <el-button size="large" type="primary" :loading="loading" @click="login(loginFormRef)">
      {{ $t("login.login") }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { HOME_URL } from "@/config";
import { getTimeState } from "@/utils";
import { Login } from "@/api/interface";
import { ElMessage, ElNotification } from "element-plus";
import { loginApi } from "@/api/modules/login";
import { useUserStore } from "@/stores/modules/user";
import { useTabsStore } from "@/stores/modules/tabs";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
// import {
//   // CircleClose,
//   UserFilled
// } from "@element-plus/icons-vue";
import type { ElForm } from "element-plus";
import { UNAUTH } from "@/api/config/servicePort";

import { baseURL } from '@/api'

const getCaptchaImgApi = `${baseURL}${UNAUTH}/getCaptchaLogin?`;

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const tabsStore = useTabsStore();
const keepAliveStore = useKeepAliveStore();
const checked = ref(true);

type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
  account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
});

const loading = ref(false);
const captchaImg = ref(`${getCaptchaImgApi}${new Date().getTime()}`);
const loginForm = reactive<Login.ReqLoginForm>({
  account: "test",
  password: "test@123",
  captcha: "",
});

// login
const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (!valid) return;
    loading.value = true;
    try {
      // 1.执行登录接口
      const result = await loginApi({ ...loginForm });

      if (result.code !== 200) {
        ElMessage.  error(result.message);
        return;
      }

      userStore.setLogin(true);

      // await userStore.getUserInfo();

      // 2.添加动态路由
      await initDynamicRouter();

      // 3.清空 tabs、keepAlive 数据
      tabsStore.setTabs([]);
      keepAliveStore.setKeepAliveName([]);
      console.log(route);
      // 4.跳转到首页
      router.push(HOME_URL);
      ElNotification({
        title: getTimeState(),
        message: "欢迎登录",
        type: "success",
        duration: 3000
      });
    } finally {
      loading.value = false;
    }
  });
};

// resetForm
// const resetForm = (formEl: FormInstance | undefined) => {
//   if (!formEl) return;
//   formEl.resetFields();
// };

const refreshCaptch = () => {
  captchaImg.value = getCaptchaImgApi + new Date().getTime();
};

onMounted(() => {
  // 监听 enter 事件（调用登录）
  document.onkeydown = (e: KeyboardEvent) => {
    e = (window.event as KeyboardEvent) || e;
    if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
      if (loading.value) return;
      login(loginFormRef.value);
    }
  };
});
</script>

<style scoped lang="scss">
@import "../index.scss";
.captcha {
  height: 38px;
  cursor: pointer;
}
:deep(.el-input-group__append) {
  padding: 0;
  padding-right: 1px;
}
.login_company_btn {
  width: 100%;
  .el-button--large {
    width: 100%;
  }
}
.logion_title {
  display: flex;
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 10px;
}
.password_handle {
  display: flex;
  width: 100%;
  font-size: 14px;
  justify-content: space-between;
  .password_forget {
    color: #999999;
    cursor: pointer;
  }
}
</style>
