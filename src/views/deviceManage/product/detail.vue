<template>
  <div class="container">
    <el-card>
      <template #header>
        <div class="flex flx-justify-between">
          <div class="mf-title">基础信息</div>
          <div>
            <el-button v-auth="'editStatus'" :type="detail?.status === '1' ? 'danger' : 'primary'" @click="editStatus">
              {{ detail?.status === "1" ? "禁用" : "启用" }}
            </el-button>
            <!-- <el-button type="primary" @click="openDialog">订阅信息</el-button>
            <el-button type="primary" @click="openDrawer('新增')">新增订阅</el-button> -->
            <el-button v-auth="'edit'" type="primary" @click="openProductEdit">编辑信息</el-button>
          </div>
        </div>
      </template>
      <el-descriptions>
        <el-descriptions-item label="名称">{{ detail?.name }}</el-descriptions-item>
        <el-descriptions-item label="ID">{{ detail?.id }}</el-descriptions-item>
        <el-descriptions-item label="设备类型">{{ filterEnum(detail?.networkType, deviceType) }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ detail?.createTime }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ detail?.updateTime }}</el-descriptions-item>
        <el-descriptions-item label="说明">{{ detail?.remark }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <Status :status="detail?.status" />
        </el-descriptions-item>
        <el-descriptions-item label="图片">
          <img width="200" :src=" 'data: image / png; base64,' + detail?.attachments[0]?.data">
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- <el-card class="mt10">
      <template #header>
        <div class="flex flx-justify-between"111>
          <div class="mf-title">协议</div>
          <el-button v-auth="'edit-protocol'" type="primary" @click="openProtocolDrawer">编辑协议</el-button>
        </div>
      </template>
      <el-descriptions>
        <el-descriptions-item label="名称">{{ protocol?.protocolName }}</el-descriptions-item>
        <el-descriptions-item label="ID">{{ protocol?.id }}</el-descriptions-item>
        <el-descriptions-item label="类型">{{ filterEnum(protocol?.type, protocolType) }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ protocol?.createTime }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ protocol?.updateTime }}</el-descriptions-item>
        <el-descriptions-item label="说明">{{ detail?.remark }}</el-descriptions-item>
      </el-descriptions>
    </el-card> -->
    <el-card v-for="(adapter, i) in adapterList" :key="i" class="mt10">
      <template #header>
        <div class="flex flx-justify-between">
          <div class="mf-title">网络组件</div>
          <!-- <el-button v-auth="'edit-component'" type="primary" @click="openAdapterDrawer(adapter)">编辑组件</el-button> -->
        </div>
      </template>
      <el-descriptions>
        <el-descriptions-item label="适配器名称">{{ adapter?.networkName }}</el-descriptions-item>
        <el-descriptions-item label="类型">{{ filterEnum(adapter?.protocolType, networkType) }}</el-descriptions-item>
        <el-descriptions-item label="地址端口">
          {{ `${adapter?.networkIp || "-"}` + (adapter?.networkPort ? `:${adapter?.networkPort}` : "") }}
        </el-descriptions-item>
        <el-descriptions-item label="CA证书">
          <el-button type="primary" link @click="() => certRef!.show()">点击查看</el-button>
        </el-descriptions-item>
        <el-descriptions-item label="id">{{ adapter?.id }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ adapter?.createTime }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ adapter?.createTime }}</el-descriptions-item>
        <el-descriptions-item label="说明">{{ adapter?.remark }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <Status :status="adapter?.status" />
        </el-descriptions-item>
        <el-descriptions-item label="协议">
          <el-button type="primary" link @click="openDialog(adapter.protocolId)">点击查看</el-button>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="mt10">
      <template #header>
        <div class="mf-title">物模型</div>
      </template>
      <div class="info">{{ thingModel?.modelBodyStr }}</div>
    </el-card>
    <SubscriptionDrawer ref="drawerRef" />
    <SubscriptionDialog ref="dialogRef" />
    <ProtocolDrawer ref="protocolRef" />
    <AdapterDrawer ref="adapterRef" />
    <CertificateDialog ref="certRef" />
    <ProtocolDetail ref="protocolDetail"/>
    <EditDrawer ref="editRef" />
  </div>
</template>

<script setup lang="ts" name="productDetail">
import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { getProductDetailApi, editProductStatus, editProduct } from "@/api/modules/product";
import { getProtocolDetailApi } from "@/api/modules/protocol";
import { Adapter, Product, Protocol, ThingModel } from "@/api/interface";
import SubscriptionDrawer from "./components/SubscriptionDrawer.vue";
import SubscriptionDialog from "./components/SubscriptionDialog.vue";
import CertificateDialog from "./components/CertificateDialog.vue";
import ProtocolDetail from "./components/ProtocolDetail.vue";
import EditDrawer from "./components/EditDrawer.vue";
import Status from "@/components/Status/index.vue";
import ProtocolDrawer from "@/views/accessManage/protocol/EditDrawer.vue";
import AdapterDrawer from "@/views/accessManage/networkAdapter/EditDrawer.vue";
import { filterEnum } from "@/utils";
import { networkType, protocolType, deviceType } from "@/utils/dict";
import { useHandleData } from "@/hooks/useHandleData";
import { editProtocol } from "@/api/modules/protocol";
import { editAdapter } from "@/api/modules/adapter";
import { useTabsStore } from "@/stores/modules/tabs";

const tabStore = useTabsStore();

const route = useRoute();
const detail = ref<Product.Detail>();
const adapterList = ref<any[]>([]);
const protocol = ref<Protocol.Response>();
const thingModel = ref<ThingModel.Response>();
const drawerRef = ref<InstanceType<typeof SubscriptionDrawer>>();
const dialogRef = ref<InstanceType<typeof SubscriptionDialog>>();
const certRef = ref<InstanceType<typeof CertificateDialog>>();
const protocolRef = ref<InstanceType<typeof ProtocolDrawer>>();
const protocolDetail = ref<InstanceType<typeof ProtocolDetail>>();
const adapterRef = ref<InstanceType<typeof AdapterDrawer>>();
const editRef = ref<InstanceType<typeof EditDrawer>>();

watch(detail, () => {
  tabStore.setTabsTitle(`${detail.value?.name || ""} - ${route.meta.title}`);
});

// 获取详情信息
async function getDetail() {
  const { data } = await getProductDetailApi({ id: route.params.id as string });
  detail.value = data;
  adapterList.value = data.netComponentVoList;
  protocol.value = data.netProtocolVo;
  thingModel.value = data.thingsModelVo;
}

// 修改权限状态
const editStatus = async () => {
  await useHandleData(editProductStatus, { id: detail.value?.id }, `修改【${detail.value?.name}】产品状态`);
  getDetail();
};
// const openDrawer = (title: string, row: Partial<Product.Response> = {}) => {
//   const params = {
//     title,
//     row: { ...row }
//   };
//   drawerRef.value?.acceptParams(params);
// };

// 编辑产品信息
const openProductEdit = () => {
  const params = {
    title: "编辑",
    row: {
      id: detail.value?.id,
      name: detail.value?.name,
      thingId: detail.value?.thingId,
      networkType: detail.value?.networkType,
      fatherId: detail.value?.fatherId,
      remark: detail.value?.remark,
      netComponentIds: detail.value?.netComponentIds
    },
    imageUrl: detail.value?.photoUrl,
    api: editProduct,
    refresh: getDetail
  };
  editRef.value?.acceptParams(params);
};

// 编辑协议
const openProtocolDrawer = () => {
  const params = {
    title: "编辑",
    row: {
      id: protocol.value?.id,
      protocolName: protocol.value?.protocolName,
      remark: protocol.value?.remark,
      type: "jar"
    },
    api: editProtocol,
    refresh: getDetail
  };
  protocolRef.value?.acceptParams(params);
};
// 编辑网络组件
const openAdapterDrawer = (adapter: any) => {
  const params = {
    title: "编辑",
    row: {
      id: adapter?.id,
      networkName: adapter?.networkName,
      protocolType: adapter?.protocolType,
      networkIp: adapter?.networkIp,
      networkPort: adapter?.networkPort,
      remark: adapter?.remark
    },
    api: editAdapter,
    refresh: getDetail
  };
  adapterRef.value?.acceptParams(params);
};

// 编辑协议
function openDialog(params) {
  getProtocolDetailApi({ id: params }).then(res => {
    protocolDetail.value!.show(res.data); 
  })
}

onMounted(() => {
  getDetail();
});
</script>

<style lang="scss" scoped>
@import "@/styles/element.scss";

.table {
  height: 300px;
}
.info {
  white-space: pre;
}
</style>
