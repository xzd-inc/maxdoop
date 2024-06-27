<template>
  <div class="tool-bar-ri">
    <!-- <el-button type="primary" :icon="Switch" @click="changeSwitch">{{ env === '物联平台' ? '运维中心' : '物联平台' }}</el-button> -->
    <el-button
      v-for="v in list"
      type="primary"
      :icon="Switch"
      @click="changeSwitch(v)"
      :disabled="env === v"
    >
      {{ v }}
    </el-button>
    <div class="header-icon">
      <!-- <AssemblySize id="assemblySize" /> -->
      <!-- <Language id="language" /> -->
      <!-- <SearchMenu id="searchMenu" /> -->
      <!-- <ThemeSetting id="themeSetting" /> -->
      <SwitchDark />
      <!-- <Message id="message" /> -->
      <Fullscreen id="fullscreen" />
      <ProjectSetting />
    </div>
    <span class="username">{{ username }}</span>
    <Avatar />
  </div>
</template> 

<script setup lang="ts">
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/modules/user";
import { Switch } from "@element-plus/icons-vue";
import ProjectSetting from "./components/ProjectSetting.vue";
import Fullscreen from "./components/Fullscreen.vue";
import Avatar from "./components/Avatar.vue";
import SwitchDark from "@/components/SwitchDark/index.vue";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const username = computed(() => userStore.userInfo.userName);

const env = localStorage.getItem("env") || "运维中心"

const list = ['物联平台', '运维中心', '场景应用'].filter(v => env !== v)

list.unshift(env)

// const changeSwitch = () => {
//   localStorage.setItem("env", env === '物联平台' ? '运维中心' : '物联平台')
//   location.href = location.protocol + '//' + location.host + '/#/home/index'
//   location.reload()
//  };

 const changeSwitch = (title: string) => {
  localStorage.setItem("env", title)
  localStorage.removeItem('maxdoop-tabs')
  location.href = location.protocol + '//' + location.host + '/#/home/index'
  location.reload()
  // if (env === '运维中心' ) {
  //   ElMessage.success('请在首页选择可操作项目')
  // }
 };
</script>

<style scoped lang="scss">
.tool-bar-ri {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 25px;
  .header-icon {
    display: flex;
    align-items: center;
    & > * {
      margin-left: 21px;
      color: var(--el-header-text-color);
    }
  }
  .username {
    margin: 0 20px;
    font-size: 15px;
    color: var(--el-header-text-color);
  }
}
</style>
