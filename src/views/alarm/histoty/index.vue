<template>
  <div class="table-box">
    <ProTable ref="proTable" :columns="columns" :request-api="alarmHistory" :init-param="initParam" :tool-button="['refresh']">
      <template #expand="scope">
        {{ scope.row }}
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
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { alarmHistory, editAlarmParams } from "@/api/modules/alarm";
import { useHasAuth } from "@/hooks/useHasAuth";
import { alarmType, alarmLevel } from '@/utils/dict';

const hasAuth = useHasAuth(["view", "edit", "delete"]);
const canEditStatus = useHasAuth(["editStatus"]);

const router = useRouter();

// const toDetail = (id: string) => {
//   router.push(`/system/roleManage/detail/${id}`);
// };

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
    prop: "targetType",
    label: "类型",
    enum: alarmType
  },
  {
    prop: "alarmLevel",
    label: "告警级别",
    enum: alarmLevel
  },
  {
    prop: "createTime",
    label: "最近告警时间"
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
  { prop: "operation", isShow: hasAuth, label: "操作", fixed: "right", width: 260 }
]);

async function changeState(row: Alarm.AlarmParams) {
  console.log(row);
  await useHandleData(editAlarmParams, { id: row.id }, `设置【${row.alarmName}】状态`);
  proTable.value?.getTableList();
  return false;
}

</script>
