<template>
  <el-dialog v-model="dialogVisible" title="在线调试" :destroy-on-close="true" width="600px" draggable>
    <div class="no-card">
      <el-tabs v-model="active">
        <el-tab-pane label="属性调试" name="properties">
          <PropDebug />
        </el-tab-pane>
        <el-tab-pane label="服务调用" name="server">
          <ServerDebug />
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>

<script setup lang="ts" name="LogDialog">
import { ref } from "vue";
import PropDebug from "./PropDebug.vue";
import ServerDebug from "./ServerDebug.vue";
// dialog状态
const dialogVisible = ref(false);
const active = ref("properties");

function show() {
  dialogVisible.value = true;
}

defineExpose({
  show
});
</script>
<style lang="scss" scoped></style>
