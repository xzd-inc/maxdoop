<template>
  <div class="login-container flx-center">
    <!-- 开源版 -->
    <div class="login-box" v-if="isCompany === false">
      <SwitchDark class="dark" />
      <div class="login-left">
        <img class="login-left-img" src="@/assets/images/login_left.png" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img class="login-img" src="@/assets/images/logo_green.png" alt="" />
          <!-- <h2 class="logo-text">Maxdoop</h2> -->
        </div>
        <LoginForm />
      </div>
    </div>
    <!-- 企业版 -->
    <div class="login-box" v-if="isCompany === true">
      <div class="login-left">
        <!-- <img class="login-left-img" src="@/assets/images/login_left.png" alt="login" /> -->
      </div>
      <div>
        <div>
          <img class="maxdoop_com_logo" src="@/assets/images/maxdoop_com_logo.png" alt="企业版" />
        </div>
        <div class="login-form">
          <div class="login_company_logo">
            <!-- <img class="login-img" src="@/assets/images/logo_green.png" alt="" /> -->
            <h2 class="logo-text">欢迎登录</h2>
          </div>
          <LoginFormCompany />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="login">
import LoginForm from "./components/LoginForm.vue";
import LoginFormCompany from "./components/LoginFormCompany.vue";
import SwitchDark from "@/components/SwitchDark/index.vue";
import { ref } from "vue";

const isCompany = ref(true);
</script>

<style scoped lang="scss">
@import "./index.scss";
.login-img {
  width: 300px;
}
</style>
