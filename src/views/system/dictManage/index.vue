<template>
  <div class="main-box">
    <TreeFilter
      label="name"
      title="字典列表"
      :data="treeFilterData"
      :extra-height="32"
      :default-value="initParam?.id"
      :auto-append="false"
      @change="changeTreeFilter"
    >
      <template #tool>
        <div class="flx-justify-between tool">
          <el-tooltip content="新增字典" placement="top">
            <el-button class="btn" text icon="Plus" @click="openDrawer('新增')" />
          </el-tooltip>
          <el-tooltip content="编辑字典" placement="top">
            <el-button class="btn" text icon="Edit" @click="openDrawer('编辑')" />
          </el-tooltip>
          <el-tooltip content="删除字典" placement="top">
            <el-button class="btn" text icon="Delete" @click="del" />
          </el-tooltip>
        </div>
      </template>
    </TreeFilter>
    <div class="table-box" v-if="initParam">
      <el-card>
        <el-descriptions title="字典信息">
          <el-descriptions-item label="字典名称">{{ initParam.name }}</el-descriptions-item>
          <el-descriptions-item label="字典标识">{{ initParam.code }}</el-descriptions-item>
          <el-descriptions-item label="描述">{{ initParam.remark }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <ProTable
        ref="proTable"
        title="字典详情"
        row-key="path"
        :request-api="getDictItemList"
        :init-param="tableInitParam"
        :indent="20"
        :columns="columns"
        :pagination="false"
        :tool-button="['refresh']"
      >
        <!-- 表格 header 按钮 -->
        <template #tableHeader>
          <el-button type="primary" :icon="CirclePlus" @click="openItemDrawer('新增')">新增</el-button>
        </template>
        <!-- 字典图标 -->
        <template #icon="scope">
          <el-icon :size="18">
            <component :is="scope.row.meta.icon"></component>
          </el-icon>
        </template>
        <!-- 字典操作 -->
        <template #operation="scope">
          <el-button link type="primary" :icon="EditPen" @click="openItemDrawer('编辑', scope.row)">编辑</el-button>
          <el-button link type="primary" :icon="Delete" @click="delItem(scope.row)">删除</el-button>
        </template>
      </ProTable>
    </div>
    <EditDrawer ref="drawerRef" />
    <EditItemDrawer ref="itemDrawerRef" />
  </div>
</template>

<script setup lang="ts" name="menuMange">
import { ref, onBeforeMount, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { Delete, EditPen, CirclePlus } from "@element-plus/icons-vue";
import {
  getDictList,
  addDict,
  editDict,
  deleteDict,
  getDictItemList,
  addDictItem,
  editDictItem,
  deleteDictItem
} from "@/api/modules/dict";
import { Dict } from "@/api/interface";
import ProTable from "@/components/ProTable/index.vue";
import EditDrawer from "./EditDrawer.vue";
import EditItemDrawer from "./EditItemDrawer.vue";
import TreeFilter from "@/components/TreeFilter/index.vue";
import { useHandleData } from "@/hooks/useHandleData";

const proTable = ref();
const initParam = ref<Dict.Source>();
const tableInitParam = reactive<{ code: string }>({ code: "" });

const treeFilterData = ref<Dict.Source[]>([]);
const getList = async () => {
  const { data } = await getDictList();
  treeFilterData.value = data;
  if (initParam.value?.id) {
    let index = data.findIndex(item => item.id === initParam.value?.id);
    let _index = index === -1 ? 0 : index;
    initParam.value = data[_index];
  } else {
    initParam.value = data[0];
  }
  tableInitParam.code = initParam.value?.code;
};

// 树形筛选切换
const changeTreeFilter = (_: string, data: Dict.Source) => {
  initParam.value = data;
  tableInitParam.code = data.code;
};

// 删除字典信息
const del = async () => {
  if (initParam.value?.id) {
    await useHandleData(deleteDict, [initParam.value?.id], `删除【${initParam.value?.name}】字典`);
    getList();
  }
};

// 删除字典详情信息
const delItem = async (row: Dict.DictItem) => {
  await useHandleData(deleteDictItem, [row.id], `删除【${row.label}】`);
  proTable.value?.getTableList();
};

// 表格配置详情
const columns: ColumnProps[] = [
  { prop: "label", label: "标签" },
  { prop: "value", label: "值" },
  { prop: "remark", label: "说明" },
  { prop: "operation", label: "操作", width: 250, fixed: "right" }
];

const drawerRef = ref<InstanceType<typeof EditDrawer> | null>(null);
const openDrawer = (title: string) => {
  if (!initParam.value && title === "编辑") return;
  drawerRef.value?.acceptParams({
    title,
    row: title === "编辑" ? { ...initParam.value } : {},
    api: title === "编辑" ? editDict : addDict,
    refresh: getList
  });
};
const itemDrawerRef = ref<InstanceType<typeof EditItemDrawer> | null>(null);
const openItemDrawer = (title: string, row: Partial<Dict.DictItem> = {}) => {
  itemDrawerRef.value?.acceptParams({
    title,
    row: { code: tableInitParam.code, ...row },
    api: title === "编辑" ? editDictItem : addDictItem,
    refresh: proTable.value?.getTableList
  });
};

onBeforeMount(() => {
  getList();
});
</script>

<style lang="scss">
.tool {
  width: 100%;
  margin-bottom: 4px;
  .btn {
    font-size: 20px;
  }
}
.left {
  width: 240px;
}
</style>
