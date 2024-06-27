<template>
  <div class="table-box">
    <ProTable ref="proTable" :columns="columns" :request-api="getNoticeParamsList" :init-param="initParam" :tool-button="['refresh']">
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增</el-button>
      </template>
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="toDetail(scope.row.id)">详情</el-button>
        <el-button type="primary"  link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button type="primary"  link :icon="Delete" @click="deleteNotice(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <EditDrawer ref="drawerRef" />
  </div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import {  Notice } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import EditDrawer from "./EditDrawer.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import { getNoticeParamsList, addNoticeParams, editNoticeParams, deleteNoticeParams } from "@/api/modules/notice";
import { notifyType, provider } from '@/utils/dict';
import { useHasAuth } from "@/hooks/useHasAuth";

const hasAuth = useHasAuth(["view", "edit", "delete"]);
const canEditStatus = useHasAuth(["editStatus"]);

const router = useRouter();

const toDetail = (id?: string) => {
  router.push(`/notice/nConfig/detail/${id}`);
};

const proTable = ref<ProTableInstance>();

const initParam = reactive({ type: 1 });

const columns = reactive<ColumnProps<Notice.NoticeParams>[]>([
  {
    prop: "searchText",
    label: "搜索",
    isShow: false,
    search: { el: "input", tooltip: "输入名字搜索" }
  },
  {
    prop: "notifyName",
    label: "配置名称",
    // render: scope => {
    //   return (
    //     <el-button type="primary" link onClick={() => toDetail(scope.row.id)}>
    //       {scope.row.notifyName}
    //     </el-button>
    //   );
    // }
  },
  {
    prop: "notifyType",
    label: "通知方式",
    enum: notifyType,
  },
  {
    prop: "provider",
    label: "类型",
    enum: provider
  },
  {
    prop: "remark",
    label: "说明"
  },
  { prop: "operation", label: "操作", fixed: "right", isShow: hasAuth, width: 260 }
]);

const deleteNotice = async (params: Notice.NoticeParams) => {
  await useHandleData(deleteNoticeParams, [params.id], `删除【${params.notifyName}】`);
  proTable.value?.getTableList();
};

const drawerRef = ref<InstanceType<typeof EditDrawer> | null>(null);
const openDrawer = (title: string, row?: Notice.NoticeParams) => {
  const params = {
    title,
    row: { ...row },
    api: title === "新增" ? addNoticeParams : editNoticeParams,
    refresh: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};
</script>
