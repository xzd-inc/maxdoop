<template>
  <el-dialog v-model="dialogVisible" title="协议" :destroy-on-close="true" width="800px" draggable>
    <template #header>
      <div class="my-header">
        <div class="header-title">协议</div>
        <el-button type="primary" @click="openProtocolDrawer">
          编辑
        </el-button>
      </div>
    </template>
    <el-descriptions>
        <el-descriptions-item label="名称">{{ detail?.protocolName }}</el-descriptions-item>
        <el-descriptions-item label="ID">{{ detail?.id }}</el-descriptions-item>
        <el-descriptions-item label="类型">{{ filterEnum(detail?.type, protocolType) }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ detail?.createTime }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ detail?.updateTime }}</el-descriptions-item>
        <el-descriptions-item label="说明">{{ detail?.remark }}</el-descriptions-item>
      </el-descriptions>
  </el-dialog>
  <ProtocolDrawer ref="protocolRef" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Protocol } from "@/api/interface";
import { editProtocol } from "@/api/modules/protocol";
import ProtocolDrawer from "@/views/accessManage/protocol/EditDrawer.vue";
import { filterEnum } from "@/utils";
import { protocolType } from "@/utils/dict";

const protocolRef = ref<any>();
const detail = ref<any>();
const dialogVisible = ref(false);

// 编辑协议
const openProtocolDrawer = () => {
  const params = {
    title: "编辑",
    row: {
      id: detail.value?.id,
      protocolName: detail.value?.protocolName,
      remark: detail.value?.remark,
      type: "jar"
    },
    api: editProtocol,
    // refresh: getDetail
  };
  protocolRef.value?.acceptParams(params);
};

function show(input) {
  dialogVisible.value = true;
  detail.value = input
}

defineExpose({
  show
});
</script>

<style scoped>
.my-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
}

.header-title {
  font-weight: 600;
  font-size: 16px;
}
</style>