<template>
  <el-dropdown trigger="click" @command="changeProject">
    <el-icon class="icon"><Files /></el-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in projectList"
          :key="item.projectId"
          :command="item.projectId"
          :disabled="currentProject.projectId === item.projectId"
        >
          {{ item.projectName }}
          <el-tag class="tag" v-if="currentProject.projectId === item.projectId" size="small" type="danger">当前项目</el-tag>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Files } from "@element-plus/icons-vue";
import { useUserStore } from "@/stores/modules/user";
import { useAuthStore } from "@/stores/modules/auth";

const auth = useAuthStore();
const userStore = useUserStore();
const projectList = computed(() => userStore.userInfo.projectDtos);
const currentProject = computed(() => auth.project);

const changeProject = (projectId: string) => {
  auth.setCurrentProject({ currentProjectId: projectId });
};
</script>

<style>
.icon {
  font-size: 20px;
  cursor: pointer;
}
.tag {
  margin-left: 6px;
}
</style>
