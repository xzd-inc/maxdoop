<template>
  <div class="table-box">
    <ProTable ref="proTable" :columns="columns" :request-api="getAdapterListApi" :init-param="initParam"
      :tool-button="['refresh']">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button v-auth="'add'" type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增适配器</el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button v-auth="'view'" type="primary" link :icon="View" @click="toDetail(scope.row.id)">详情</el-button>
        <el-button v-auth="'edit'" type="primary" link :icon="EditPen"
          @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button v-auth="'delete'" type="primary" link :icon="Delete" @click="deleteAdapter(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <EditDrawer ref="drawerRef" />
  </div>
</template>

<script setup lang="tsx" name="adapterList">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { Adapter } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import EditDrawer from "./EditDrawer.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import { getAdapterListApi, addAdapter, editAdapter, deleteAdapterApi } from "@/api/modules/adapter";
import { status, networkType } from "@/utils/dict";
import { useHasAuth } from "@/hooks/useHasAuth";

const hasAuth = useHasAuth(["edit", "delete", "view"]);

const router = useRouter();

// 跳转详情页
const toDetail = (id: string) => {
  router.push(`/access/networkManage/detail/${id}`);
};

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 如果表格需要初始化请求参数，直接定义传给 ProTable (之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({});

// 表格配置项
const columns = reactive<ColumnProps<Adapter.Response>[]>([
  {
    prop: "searchText",
    label: "搜索",
    isShow: false,
    search: { el: "input", tooltip: "输入名字搜索" }
  },
  {
    prop: "networkName",
    label: "名称"
  },
  {
    prop: "protocolType",
    label: "协议类型",
    enum: networkType
  },
  // {
  //   prop: "id",
  //   label: "详情",
  //   render: scope => {
  //     return `${scope.row.networkIp || "-"}` + (scope.row.networkPort ? `:${scope.row.networkPort}` : "");
  //   }
  // },
  {
    prop: "status",
    label: "状态",
    enum: status,
    tag: true
  },
  {
    prop: "createTime",
    label: "创建时间"
  },
  { prop: "operation", label: "操作", fixed: "right", isShow: hasAuth, width: 260 }
]);

// 删除适配器信息
const deleteAdapter = async (params: Adapter.Response) => {
  await useHandleData(deleteAdapterApi, [params.id], `删除【${params.networkName}】适配器`);
  proTable.value?.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof EditDrawer> | null>(null);
const openDrawer = (title: string, row?: any) => {
  const params = {
    title,
    row: row
      ? {
        id: row.id,
        networkName: row.networkName,
        protocolType: row.protocolType,
        port: row.configuration?.port,
        broker: row.configuration?.broker,
        username: row.configuration?.username,
        password: row.configuration?.password,
        topic: row.configuration.topic || [''],
        productId:row.productId,
        protocolId:row.protocolId,
        remark: row.remark,
        attachmentIds: row.attachmentIds || [],
        certificateIds: row.certificateIds || [],
        networkTypes: row.networkTypes || '0',
      }
      : {
        networkTypes: '0',
        topic: [''],
        attachmentIds: [],
        certificateIds: []
      },
    api: title === "新增" ? addAdapter : editAdapter,
    refresh: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};
</script>
