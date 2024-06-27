<!-- 经典布局 -->
<template>
  <el-container class="layout">
    <el-header>
      <div class="header-lf mask-image">
        <div class="logo flx-center">
          <img class="logo-img" src="@/assets/images/logo_green.png" alt="logo" />
          <!-- <span class="logo-text">{{ title }}</span> -->
        </div>
        <ToolBarLeft />
      </div>
      <!-- <div class="header-center" v-if="env === '运维中心'">当前项目：{{ store?.project?.projectName }}</div> -->
      <div class="header-center" v-if="env === '运维中心'">
        <el-cascader :modelValue="projectValue" :options="operatableList" @change="handleChange"
          style="width: 320px;" />
      </div>
      <div class="header-ri">
        <ToolBarRight />
      </div>
    </el-header>
    <el-container class="classic-content">
      <el-aside>
        <div class="aside-box" :style="{ width: isCollapse ? '65px' : '210px' }">
          <el-scrollbar>
            <el-menu :router="false" :default-active="activeMenu" :collapse="isCollapse" :unique-opened="accordion"
              :collapse-transition="false">
              <SubMenu :menu-list="menuList" />
            </el-menu>
          </el-scrollbar>
        </div>
      </el-aside>
      <el-container class="classic-main">
        <Main />
      </el-container>
    </el-container>
  </el-container>
  <openDialog ref="dialogRef" v-if="env === '运维中心'"/>
</template>

<script setup lang="ts" name="layoutClassic">
import { computed, reactive, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/modules/auth";
import { useGlobalStore } from "@/stores/modules/global";
import Main from "@/layouts/components/Main/index.vue";
import SubMenu from "@/layouts/components/Menu/SubMenu.vue";
import ToolBarLeft from "@/layouts/components/Header/ToolBarLeft.vue";
import ToolBarRight from "@/layouts/components/Header/ToolBarRight.vue";
import currentProject from '@/stores/modules/currentProject';
import useCurrentProject from '@/stores/modules/currentProject';
import { getOperatableList, editOperatable } from "@/api/modules/menu";
import { ElMessage } from "element-plus";
import openDialog from './Dialog.vue';
import { storeToRefs } from 'pinia';


const env = localStorage.getItem("env")
const dialogRef = ref();

const store = currentProject()
const { projectValue, } = storeToRefs(store)
const { setProject, setProjectValue } = useCurrentProject()

const operatableList = reactive<Array<any>>([])

onMounted(() => {
  if (env=== '运维中心') {
    getOperatableList().then(res => {
      const list = res.data.map(v => {
        return {
          label: v.typeName,
          value: v.type,
          children: v.children?.map(c => {
            return {
              label: c.projectName,
              value: c.projectId,
            }
          })
        }
      })
      operatableList.push(...list)
    })
    
  }
  })

  const handleChange = (value) => {
    setProjectValue(value)
    editOperatable(value[1])
      .then(res => {
        ElMessage.success("操作成功！")
        setProject(res.data)
      }).catch(err => {
        console.log(err);
      })
  }

  const route = useRoute();
  const authStore = useAuthStore();
  const globalStore = useGlobalStore();
  const accordion = computed(() => globalStore.accordion);
  const isCollapse = computed(() => globalStore.isCollapse);
  const menuList = computed(() => authStore.showMenuListGet);
  const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
