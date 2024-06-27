<template>
  <div class="container">
    <el-card>
      <template #header>
        <div class="mf-title">基础信息</div>
      </template>
      <el-descriptions>
        <el-descriptions-item label="协议名称">{{ detail?.protocolName }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ detail?.createTime }}</el-descriptions-item>
        <el-descriptions-item label="类型">{{ filterEnum(detail?.type, protocolType) }}</el-descriptions-item>
        <el-descriptions-item label="ID">{{ detail?.id }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ detail?.createTime }}</el-descriptions-item>
        <el-descriptions-item label="说明">{{ detail?.remark }}</el-descriptions-item>
        <el-descriptions-item label="协议">{{ detail?.attachments[0].fileName }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="protocolDetail">
import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { getProtocolDetailApi } from "@/api/modules/protocol";
import { Protocol } from "@/api/interface";
import { filterEnum } from "@/utils";
import { protocolType } from "@/utils/dict";
import { useTabsStore } from "@/stores/modules/tabs";

const tabStore = useTabsStore();

const route = useRoute();
const detail = ref<Protocol.Response>();

watch(detail, () => {
  tabStore.setTabsTitle(`${detail.value?.protocolName || ""} - ${route.meta.title}`);
});

// 获取详情信息
async function getDetail() {
  const { data } = await getProtocolDetailApi({ id: route.params.id as string });
  detail.value = data;
}

onMounted(() => {
  getDetail();
});
</script>

<style lang="scss" scoped>
@import "@/styles/element.scss";

.container {
  height: 100%;
  :deep(.el-tabs__header) {
    @include card;
    padding: 0 20px;
    margin-bottom: 10px;
    .el-tabs__nav-wrap::after {
      height: 0;
    }
  }
}
.box-card {
  margin-top: 10px;
}
.table {
  :deep(.el-card__body) {
    height: calc(100vh - 390px);
  }
}
</style>
