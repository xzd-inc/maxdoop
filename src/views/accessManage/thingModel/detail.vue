<template>
  <div class="container">
    <el-card>
      <template #header>
        <div class="mf-title">基础信息</div>
      </template>
      <el-descriptions>
        <el-descriptions-item label="物模型名称">{{ detail?.modelName }}</el-descriptions-item>
        <el-descriptions-item label="ID">{{ detail?.id }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ detail?.createTime }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ detail?.updateTime }}</el-descriptions-item>
        <el-descriptions-item label="说明">{{ detail?.remark }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="box-card table">
      <template #header>
        <div class="flex flx-justify-between">
          <div class="mf-title">详细信息</div>
          <el-button type="primary" @click="() => infoRef!.show()">查看物模型</el-button>
        </div>
      </template>
      <el-tabs v-model="active">
        <el-tab-pane class="pane" label="属性" name="properties">
          <PropertiesTable />
        </el-tab-pane>
        <el-tab-pane class="pane" label="服务" name="server">
          <ServerTable />
        </el-tab-pane>
        <el-tab-pane class="pane" label="事件" name="event">
          <EventTable />
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <InfoDialog ref="infoRef" />
  </div>
</template>

<script setup lang="ts" name="thingModelDetail">
import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { getThingModelDetailApi } from "@/api/modules/thingModel";
import { ThingModel } from "@/api/interface";
import PropertiesTable from "./components/PropertiesTable.vue";
import ServerTable from "./components/ServerTable.vue";
import EventTable from "./components/EventTable.vue";
import InfoDialog from "./components/InfoDialog.vue";
import { useTabsStore } from "@/stores/modules/tabs";

const tabStore = useTabsStore();

const route = useRoute();
const detail = ref<ThingModel.Response>();
const infoRef = ref<InstanceType<typeof InfoDialog>>();
const active = ref("properties");

// 获取详情信息
async function getDetail() {
  const { data } = await getThingModelDetailApi({ id: route.params.id as string });
  detail.value = data;
}

watch(detail, () => {
  tabStore.setTabsTitle(`${detail.value?.modelName || ""} - ${route.meta.title}`);
});

onMounted(() => {
  getDetail();
});
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
.box-card {
  margin-top: 10px;
}
.pane {
  height: calc(100vh - 495px);
}
</style>
