<template>
  <div class="table-box">
    <ProTable ref="proTable" :columns="columns" :request-api="getAlarmParamsListApi" :init-param="initParam" :tool-button="['refresh']">
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增</el-button>
      </template>
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="toDetail(scope.row.id)">详情</el-button>
        <el-button type="primary"  link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button type="primary"  link :icon="Delete" @click="deleteAlarm(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <EditDrawer ref="drawerRef" />
  </div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { Alarm } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import EditDrawer from "./EditDrawer.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import { getAlarmParamsListApi, addAlarmParams, editAlarmParams, deleteAlarmParams } from "@/api/modules/alarm";
import { alarmType, alarmLevel } from '@/utils/dict';
import { useHasAuth } from "@/hooks/useHasAuth";

const hasAuth = useHasAuth(["view", "edit", "delete"]);
const canEditStatus = useHasAuth(["editStatus"]);

const router = useRouter();

const toDetail = (id?: string) => {
  router.push(`/alarm/aConfig/detail/${id}`);
};

const proTable = ref<ProTableInstance>();

const initParam = reactive({ type: 1 });

const columns = reactive<ColumnProps<Alarm.AlarmParams>[]>([
  {
    prop: "searchText",
    label: "搜索",
    isShow: false,
    search: { el: "input", tooltip: "输入名字搜索" }
  },
  {
    prop: "alarmName",
    label: "配置名称",
    // render: scope => {
    //   return (
    //     <el-button type="primary" link onClick={() => toDetail(scope.row.id)}>
    //       {scope.row.alarmName}
    //     </el-button>
    //   );
    // }
  },
  {
    prop: "alarmType",
    label: "类型",
    enum: alarmType,
  },
  {
    prop: "alarmLevel",
    label: "告警级别",
    enum: alarmLevel
  },
  {
    prop: "status",
    label: "状态",
    render: scope => {
      return (
        <el-switch
          disabled={!canEditStatus}
          type="primary"
          v-model={scope.row.status}
          before-change={() => changeState(scope.row)}
          inline-prompt
          active-text="启用"
          inactive-text="禁用"
          active-value="1"
          inactive-value="0"
        ></el-switch>
      )
    }
  },
  {
    prop: "remark",
    label: "说明"
  },
  { prop: "operation", label: "操作", fixed: "right", isShow: hasAuth, width: 260 }
]);

const deleteAlarm = async (params: Alarm.AlarmParams) => {
  await useHandleData(deleteAlarmParams, [params.id], `删除【${params.alarmName}】`);
  proTable.value?.getTableList();
};

async function changeState(row: Alarm.AlarmParams) {
  console.log(row);
  await useHandleData(editAlarmParams, { id: row.id }, `设置【${row.alarmName}】状态`);
  proTable.value?.getTableList();
  return false;
}

const drawerRef = ref<InstanceType<typeof EditDrawer> | null>(null);
const openDrawer = (title: string, row: Alarm.AlarmParams = {}) => {
  const params = {
    title,
    row: { ...row },
    api: title === "新增" ? addAlarmParams : editAlarmParams,
    refresh: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};
</script>
