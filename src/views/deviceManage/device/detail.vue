<template>
  <div class="container">
    <el-card>
      <template #header>
        <div class="flex flx-justify-between">
          <div class="mf-title">基础信息</div>
          <div>
            <el-button :type="detail?.enable === '0' ? 'danger' : 'primary'" @click="editStatus">
              {{ detail?.enable === "0" ? "禁用" : "启用" }}
            </el-button>
          </div>
        </div>
      </template>
      <el-descriptions>
        <el-descriptions-item label="设备名称">{{ detail?.deviceName }}</el-descriptions-item>
        <el-descriptions-item label="设备标识">{{ detail?.identifier }}</el-descriptions-item>
        <el-descriptions-item label="关联产品">{{ detail?.productInfo?.productName }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <Status :status="detail?.status" />
        </el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ detail?.updateTime }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ detail?.createTime }}</el-descriptions-item>
        <el-descriptions-item label="说明">{{ detail?.remark }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="mt10">
      <template #header>
        <div class="flex flx-justify-between">
          <div class="mf-title">最近数据</div>
          <!-- <div>
            <el-button type="primary" @click="openDebug">在线调试</el-button>
            <el-button type="primary" @click="openLog">日志</el-button>
          </div> -->
        </div>
      </template>
      <el-tabs v-model="active">
        <el-tab-pane label="属性" name="properties">
          <div style="float: right;">
            <el-radio-group v-model="tabButton">
              <el-radio-button label="卡片" value="card" />
              <el-radio-button label="列表" value="tab" />
            </el-radio-group>
          </div>
          <div style="padding-top: 50px;">
            <div class="table">
              <template v-if="properties && tabButton === 'card'">
                <PropertiesCard v-for="item in properties" :key="item.id" :name="item.name"
                  :identifier="item.identifier" :propertyContent="item?.uplinkPropertyVo?.propertyContent" data-index="propertyContent"
                  :data="properties?.[item.id!]" :item="item" />
              </template>
            </div>
            <div v-if="tabButton === 'tab'">
              <el-table :data="properties"
                :header-row-style="{ '--el-table-header-bg-color': '#F5F7FA' }">
                <el-table-column prop="name" label="名称" />
                <el-table-column prop="identifier" label="标识" />
                <el-table-column prop="uplinkPropertyVo.propertyContent" label="值" />
                <el-table-column prop="unitName" label="单位" />
                <el-table-column prop="uplinkPropertyVo.updateTime" label="更新时间" />
                <el-table-column fixed="right" label="操作" width="120">
                  <template #default="scope">
                    <!-- <el-button link type="primary" size="small">
                    内容
                  </el-button> -->
                    <el-button link type="primary" size="small"
                      @click="propertiesDetailDialog(scope.row)">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="服务" name="server">
          <div style="float: right;">
            <el-button type="primary" style="margin-right: 10px;margin-top: 10px" @click="openDebug">调试</el-button>
            <el-radio-group v-model="tabButton">
              <el-radio-button label="卡片" value="card" />
              <el-radio-button label="列表" value="tab" />
            </el-radio-group>
          </div>
          <div style="padding-top: 50px;">
            <div class="table" v-if="tabButton === 'card'">
              <Card v-for="item in services" :key="item.id" :name="item.name"
                :identifier="item.identifier" :callType="item.callType" data-index="functionContent"
                :data="services?.[item.id!]" :item="item" />
            </div>
            <div v-if="tabButton === 'tab'">
              <el-table :data="services"
                :header-row-style="{ '--el-table-header-bg-color': '#F5F7FA' }">
                <el-table-column prop="name" label="名称" />
                <el-table-column prop="netComponentVo.networkName" label="组件" />
                <el-table-column prop="identifier" label="标识" />
                <el-table-column prop="callType" label="是否异步">
                  <template #default="scope">
                    {{ scope.row?.callType === '1' ? '同步' : '异步' }}
                  </template>
                </el-table-column>
                <el-table-column prop="updateTime" label="最新下发时间" />
                <el-table-column fixed="right" label="操作" width="120">
                  <template #default="scope">
                    <!-- <el-button link type="primary" size="small">
                    内容
                  </el-button> -->
                    <el-button link type="primary" size="small" @click="serviceDetailDialog(scope.row)">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="事件" name="event">
          <div style="float: right;">
            <el-radio-group v-model="tabButton">
              <el-radio-button label="卡片" value="card" />
              <el-radio-button label="列表" value="tab" />
            </el-radio-group>
          </div>
          <div style="padding-top: 50px;">
            <div class="table" v-if="tabButton === 'card'">
              <EventCard v-for="item in events" :key="item.id" :name="item.name"
                :identifier="item.identifier" :updateTime="item.updateTime" data-index="eventsValue" :data="events?.[item.id!]"
                :item="item" />
            </div>
            <div v-if="tabButton === 'tab'">
              <el-table :data="events" :header-row-style="{ '--el-table-header-bg-color': '#F5F7FA' }">
                <el-table-column prop="name" label="名称" />
                <el-table-column prop="identifier" label="标识" />
                <el-table-column prop="updateTime" label="更新时间" />
                <el-table-column fixed="right" label="操作" width="120">
                  <template #default="scope">
                    <!-- <el-button link type="primary" size="small">
                    内容
                  </el-button> -->
                    <el-button link type="primary" size="small" @click="eventsDetailDialog(scope.row)">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="子设备" name="child" v-if="detail?.productInfo?.networkType === 2">
          <div style="float: right;">
            <el-radio-group v-model="tabButton">
              <el-radio-button label="卡片" value="card" />
              <el-radio-button label="列表" value="tab" />
            </el-radio-group>
          </div>
          <div style="padding-top: 50px;">
            <div class="table" v-if="tabButton === 'card'">
              <ChildCard v-for="item in childs" :key="item.id" :deviceName="item.deviceName" :identifier="item.identifier" :updateTime="item.updateTime" :status="item.status" data-index="eventsValue"
                :data="childs[item.id!]" :item="item" />
            </div>
            <div v-if="tabButton === 'tab'">
              <el-table :data="childs" :header-row-style="{ '--el-table-header-bg-color': '#F5F7FA' }">
                <el-table-column prop="deviceName" label="名称" />
                <el-table-column prop="identifier" label="标识" />
                <el-table-column prop="status" label="状态">
                  <template #default="scope">
                    <el-tag :type="scope.row.status === '0' ? 'danger' : 'primary'">
                      {{ scope.row.status === '0' ? '离线' : '在线'}}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="updateTime" label="最后连接时间" />
                <el-table-column prop="updateTime" label="更新时间" />
              </el-table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <DebugDialog ref="debugRef" />
    <LogDialog ref="logRef" />
    <SetDialog ref="setDebugRef" />
    <DetailDialog ref="detailDialogRef" />
    <PropertiesDetailDialog ref="propertiesDetailDialogRef" />
    <EventDetailDialog ref="eventDetailDialogRef" />
  </div>
</template>

<script setup lang="ts" name="deviceDetail">
import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { getDeviceDetailApi, getDeviceProperties, getDeviceEvents, getDeviceServices, getDevicetChild } from "@/api/modules/device";
import { Device } from "@/api/interface";
import LogDialog from "./components/LogDialog.vue";
import DebugDialog from "./components/DebugDialog.vue";
import Card from "./components/Card.vue";
import EventCard from "./components/EventCard.vue";
import PropertiesCard from "./components/PropertiesCard.vue"
import DetailDialog from './components/DetailDialog.vue';
import ChildCard from './components/ChildCard.vue'
import PropertiesDetailDialog from "./components/PropertiesDetailDialog.vue";
import EventDetailDialog from './components/EventDetailDialog.vue';
import Status from "@/components/Status/index.vue";
import { useTabsStore } from "@/stores/modules/tabs";
import { useHandleData } from "@/hooks/useHandleData";
import { editDeviceStatus } from "@/api/modules/device";
import SetDialog from './components/SetDialog.vue';

const tabStore = useTabsStore();
const tabButton = ref('card');

const route = useRoute();
const detail = ref<Device.Detail>();
const properties = ref<any>();
const events = ref<any>();
const services = ref<any>();
const childs = ref<any>();
const debugRef = ref<InstanceType<typeof DebugDialog>>();
const logRef = ref<InstanceType<typeof LogDialog>>();
const active = ref("properties");
const setDebugRef = ref<any>();
const detailDialogRef = ref<any>();
const propertiesDetailDialogRef = ref<any>();
const eventDetailDialogRef = ref<any>();

const openDebug = () => {
  setDebugRef.value.show();
}

watch(detail, () => {
  tabStore.setTabsTitle(`${detail.value?.deviceName || ""} - ${route.meta.title}`);
});

// 获取设备属性
async function getProperties() {
  const { data } = await getDeviceProperties({ deviceId: route.params.id as string });
  properties.value = data;
}
// 获取设备事件
async function getEvents() {
  const { data } = await getDeviceEvents({ deviceId: route.params.id as string });
  events.value = data;
}
// 获取设备服务
async function getServices() {
  const { data } = await getDeviceServices({ deviceId: route.params.id as string });
  services.value = data;
}

async function getChilds() {
  const { data } = await getDevicetChild({ parentDeviceId: route.params.id as string });
  childs.value = data;
}

// 获取详情信息
async function getDetail() {
  const { data } = await getDeviceDetailApi({ id: route.params.id as string });
  detail.value = data;
}

// 修改权限状态
const editStatus = async () => {
  console.log('cesces ', detail.value);
  await useHandleData(editDeviceStatus, { id: detail.value?.id }, `修改【${detail.value?.deviceName}】状态`);
  getDetail();
};

const serviceDetailDialog = (row) => {
  detailDialogRef.value.show(row.id);
}

const propertiesDetailDialog = (row) => {
  propertiesDetailDialogRef.value.show(row)
}

const eventsDetailDialog = (row) => {
  eventDetailDialogRef.value.show(row);
}

// const openDebug = () => {
//   debugRef.value?.show();
// };

// const openLog = () => {
//   logRef.value?.show();
// };

onMounted(() => {
  getDetail();
  getEvents();
  getProperties();
  getServices();
  getChilds();
});
</script>

<style lang="scss" scoped>
.table {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 10px;
  // height: calc(100vh - 535px);
  overflow: auto;
}
</style>
