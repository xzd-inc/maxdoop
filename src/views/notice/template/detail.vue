<template>
  <el-tabs v-model="activeName" class="container" @tab-click="handleClick">
    <el-card>
      <template #header>
        <div class="mf-title">基础信息</div>
      </template>
      <el-descriptions>
        <el-descriptions-item label="通知方式">{{notifyType.find(v => v.value === detail?.notifyType)?.label || '-'}}</el-descriptions-item>
        <el-descriptions-item label="名称">{{ detail?.templateName }}</el-descriptions-item>
        <el-descriptions-item label="类型">{{ provider.find(v => v.value === detail?.provider)?.label || '-'}}</el-descriptions-item>
        <el-descriptions-item label="绑定配置">{{ detail?.notifyConfigId }}</el-descriptions-item>
        <el-descriptions-item label="模板">{{ detail?.template?.templateId }}</el-descriptions-item>
        <el-descriptions-item label="收信人">{{ detail?.template?.receiver }}</el-descriptions-item>
        <el-descriptions-item label="签名">{{ detail?.template?.signature }}</el-descriptions-item>
        <el-descriptions-item label="模板内容">{{ detail?.template?.content }}</el-descriptions-item>
        <el-descriptions-item label="说明">{{ detail?.remark }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </el-tabs>
</template>

<script setup lang="ts" name="noticeDetail">
import { useRoute } from "vue-router";
import { ref, onMounted, reactive } from "vue";
import { detailNoticeTemplate } from "@/api/modules/notice";
import { notifyType, provider } from '@/utils/dict';

interface IDeatil {
  createBy: string,
  createTime: string,
  creator: string,
  deleted: string,
  editor: string,
  enable: "1",
  id: string,
  notifyConfigId: string,
  notifyType: "sms",
  projectId: string,
  provider: string,
  remark: string,
  searchText: string,
  template: {
    receiver: string,
    signature: "",
    templateId: "1",
    content: ""
  },
  templateName: string,
  updateBy: string,
  updateTime: string,
}

const detail = ref<IDeatil>();
const route = useRoute();
const activeName = ref("first");
function handleClick(e) {
  console.log(e);
}

async function getDetail() {
  const { data } = await detailNoticeTemplate({ id: route.params.id });
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
    height: calc(100vh - 450px);
  }
}
</style>
