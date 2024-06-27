<template>
  <div class="container">
    <el-card>
      <template #header>
        <div class="flex flx-justify-between">
          <div class="mf-title">基础信息</div>
          <div>
             <el-button 
             :type="detail?.status === '1' ? 'danger' : 'primary'">
              {{ detail?.status === "1" ? "禁用" : "启用" }}
            </el-button>
            </div>
        </div>
      </template>
      <el-descriptions>
        <el-descriptions-item label="适配器名称">{{ detail?.networkName }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ detail?.createTime }}</el-descriptions-item>
        <el-descriptions-item label="类型">{{ filterEnum(detail?.protocolType, networkType) }}</el-descriptions-item>
        <el-descriptions-item label="地址端口">
          {{ `${detail?.configuration?.broker || ''}:${detail?.configuration?.port || ''}` }}
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ detail?.createTime }}</el-descriptions-item>
        <el-descriptions-item label="id">{{ detail?.id }}</el-descriptions-item>
        <el-descriptions-item label="说明">{{ detail?.remark }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="detail?.status === '1' ? 'success' : 'danger'">{{ filterEnum(detail?.status, status) }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="box-card" v-if="detail?.configuration">
      <template #header>
        <div class="flex flx-justify-between">
          <div class="mf-title">配置信息</div>
        </div>
      </template>
      <el-descriptions>
        <el-descriptions-item label="产品">{{ detail?.productVo?.name }}</el-descriptions-item>
        <el-descriptions-item label="协议">{{ detail?.networkName }}</el-descriptions-item>
        <el-descriptions-item label="地址端口">
          {{ `${detail?.configuration?.broker || ''}:${detail?.configuration?.port || ''}` }}
        </el-descriptions-item>
        <el-descriptions-item label="用户名">{{ detail?.configuration?.userName }}</el-descriptions-item>
        <el-descriptions-item label="密码">{{ detail?.configuration?.password }}</el-descriptions-item>
        <el-descriptions-item label="主题">{{ detail?.configuration?.topic }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="flex flx-justify-between">
          <div class="mf-title">证书</div>
          <div>
            <el-upload
              ref="upload"
              class="upload"
              action="#"
              :on-exceed="handleExceed"
              :http-request="handleHttpUpload"
              :show-file-list="false"
              :limit="1"
            >
              <el-button type="primary">更新证书</el-button>
            </el-upload>
          </div>
        </div>
      </template>
      <div class="content">{{ detail?.certificate }}</div>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="adapterDetail">
import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { getAdapterDetailApi, editAdapter } from "@/api/modules/adapter";
import { Adapter } from "@/api/interface";
import { filterEnum } from "@/utils";
import { networkType, status } from "@/utils/dict";
import type { UploadProps, UploadRawFile, UploadRequestOptions } from "element-plus";
import { ElMessage, genFileId } from "element-plus";
import { useTabsStore } from "@/stores/modules/tabs";

const tabStore = useTabsStore();

const route = useRoute();
const detail = ref<Adapter.Response>();
const upload = ref();

watch(detail, () => {
  tabStore.setTabsTitle(`${detail.value?.networkName || ""} - ${route.meta.title}`);
});

const handleExceed: UploadProps["onExceed"] = files => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
  upload.value!.submit();
};
const handleHttpUpload = async (options: UploadRequestOptions) => {
  try {
    let formData = new FormData();
    formData.append("file", options.file);
    if (detail.value?.id) formData.append("id", detail.value.id);
    if (detail.value?.networkName) formData.append("networkName", detail.value?.networkName);
    if (detail.value?.protocolType) formData.append("protocolType", detail.value?.protocolType);
    if (detail.value?.networkIp) formData.append("networkIp", detail.value?.networkIp);
    if (detail.value?.networkPort) formData.append("networkPort", detail.value?.networkPort);
    if (detail.value?.remark) formData.append("remark", detail.value?.remark);
    await editAdapter(formData);
    ElMessage.success("更新成功");
    getDetail();
  } catch (error) {
    options.onError(error as any);
  }
};

// 获取详情信息
async function getDetail() {
  const { data } = await getAdapterDetailApi({ id: route.params.id as string });
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
.content {
  height: calc(100vh - 475px);
  overflow: auto;
  white-space: pre;
  text-align: center;
}
</style>
