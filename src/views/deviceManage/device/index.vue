<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      :columns="columns"
      :request-api="getDeviceListApi"
      :init-param="initParam"
      :tool-button="['refresh']"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button v-auth="'add'" type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增设备</el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button v-auth="'view'" type="primary" link :icon="View" @click="toDetail(scope.row.id)">详情</el-button>
        <el-button v-auth="'edit'" type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button v-auth="'delete'" type="primary" link :icon="Delete" @click="deleteDevice(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <EditDrawer ref="drawerRef" />
  </div>
</template>

<script setup lang="tsx" name="device">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { Device } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import EditDrawer from "./components/EditDrawer.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import { editDevice, deleteDeviceApi, getDeviceListApi, addDevice, editDeviceStatus } from "@/api/modules/device";
import { useHasAuth } from "@/hooks/useHasAuth";

const hasAuth = useHasAuth(["edit", "delete", "view"]);
const canEditStatus = useHasAuth(["editStatus"]);

const router = useRouter();

// 跳转详情页
const toDetail = (id: string) => {
  router.push(`/deviceManage/device/detail/${id}`);
};

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 如果表格需要初始化请求参数，直接定义传给 ProTable (之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({});

// 表格配置项
const columns = reactive<ColumnProps<Device.Response>[]>([
  {
    prop: "searchText",
    label: "搜索",
    isShow: false,
    search: { el: "input", tooltip: "输入名字搜索" }
  },
  {
    prop: "id",
    label: "ID"
  },
  {
    prop: "deviceName",
    label: "名称"
  },
  {
    prop: "identifier",
    label: "设备标识"
  },
  {
    prop: "productInfo.productName",
    label: "产品名称"
  },
  {
    prop: "status",
    label: "在线状态",
    render: scope => {
      return (
        <>
          {
            scope.row.status === '0'
            ?  (
              <div class="status">
                <span class="circle-red"></span>
                <span>离线</span>
              </div>
            ) : (
              <div class="status">
                <span class="circle-green"></span>
                <span>在线</span>
              </div>
            )
          }
        </>
      )
    }
  },
  // {
  //   prop: "enable",
  //   label: "启动",
  //   render: scope => {
  //     return (
  //       <el-switch
  //         disabled={!canEditStatus}
  //         type="primary"
  //         model-value={!!+scope.row.enable}
  //         before-change={() => changeState(scope.row)}
  //         inline-prompt
  //         active-text="启用"
  //         inactive-text="禁用"
  //       ></el-switch>
  //     );
  //   }
  // },
  {
    prop: "createTime",
    label: "更新"
  },
  { prop: "operation", label: "操作", fixed: "right", isShow: hasAuth, width: 260 }
]);

// 删除设备信息
const deleteDevice = async (params: Device.Response) => {
  await useHandleData(deleteDeviceApi, [params.id], `删除【${params.deviceName}】设备`);
  proTable.value?.getTableList();
};

// 修改状态
async function changeState(row: Device.Response) {
  await useHandleData(editDeviceStatus, { id: row.id }, `设置【${row.deviceName}】状态`);
  proTable.value?.getTableList();
  return false;
}

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof EditDrawer> | null>(null);
const openDrawer = (title: string, row: Partial<Device.Response> = {}) => {
  const params = {
    title,
    row: row
      ? {
          id: row.id,
          deviceName: row.deviceName,
          productId: row.productId,
          remark: row.remark,
          identifier: row.identifier,
        }
      : {},
    api: title === "新增" ? addDevice : editDevice,
    refresh: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};
</script>

<style scoped>
  ::v-deep .circle-green {
    width: 8px;
    height: 8px;
    display: inline-block;
    background-color: #52c41a;
    border-radius: 50%;
    margin-right: 5px;
  }
  ::v-deep .circle-red {
    width: 8px;
    height: 8px;
    display: inline-block;
    background-color: red;
    border-radius: 50%;
    margin-right: 5px;
  }
</style>