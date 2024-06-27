<template>
  <div class="table-box">
    <ProTable ref="proTable" :columns="columns" :request-api="getRuleEngineList" :init-param="initParam"
      :tool-button="['refresh']">
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增</el-button>
      </template>
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="toDetail(scope.row.id)">详情</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteAlarm(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <EditDrawer ref="drawerRef" />
  </div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ruleEngine } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import {  deleteAlarmParams } from "@/api/modules/alarm";
import { getRuleEngineList, addRuleEngine, editRuleEngine } from "@/api/modules/ruleEngine";
import EditDrawer from "./EditDrawer.vue";
import { useHasAuth } from "@/hooks/useHasAuth";

const hasAuth = useHasAuth(["view", "edit", "delete"]);
const canEditStatus = useHasAuth(["editStatus"]);

const router = useRouter();

const toDetail = (id: string) => {
  router.push(`/ruleEngine/linkage/detail/${id}`);
};

const proTable = ref<ProTableInstance>();

const initParam = reactive({ type: 1 });

const columns = reactive<ColumnProps<ruleEngine.linkage>[]>([
  {
    prop: "searchText",
    label: "搜索",
    isShow: false,
    search: { el: "input", tooltip: "输入名字搜索" }
  },
  {
    prop: "ruleName",
    label: "名称",
  },
  {
    prop: "ruleType",
    label: "触发方式",
    enum: [
      { label: '设备触发', value: "1" },
      { label: '定时触发',value: "2" },
      { label: '手动触发',value: "3" }
    ]
  },
  {
    prop: "ruleStatus",
    label: "状态",
    render: scope => {
      return (
        <el-switch
          type="primary"
          v-model={scope.row.ruleStatus}
          before-change={() => changeState(scope.row)}
          inline-prompt
          active-text="启用"
          inactive-text="关闭"
          active-value="1"
          inactive-value="0"
        ></el-switch>
      )
    }
  },
  {
    prop: "remark",
    label: "说明",
  },
  { prop: "operation", isShow: hasAuth, label: "操作", fixed: "right", width: 260 }
]);

const deleteAlarm = async (params: ruleEngine.linkage) => {
  await useHandleData(deleteAlarmParams, [params.id], `删除【${params.ruleName}】`);
  proTable.value?.getTableList();
};

async function changeState(row: ruleEngine.linkage) {
  await useHandleData(editRuleEngine, { id: row.id }, `设置【${row.ruleName}】状态`);
  proTable.value?.getTableList();
  return false;
}

const drawerRef = ref<InstanceType<typeof EditDrawer> | null>(null);
const openDrawer = (title: string, row?: ruleEngine.linkage) => {
  const params = {
    title,
    row: { ...row },
    api: title === "新增" ? addRuleEngine : editRuleEngine,
    refresh: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};
</script>
