<template>
  <div class="main-box">
    <TreeFilter
      label="name"
      title="权限列表"
      :data="treeFilterData"
      :extra-height="32"
      :default-value="initParam?.id"
      :auto-append="false"
      @change="changeTreeFilter"
    >
      <template #tool>
        <div class="flx-justify-between tool">
          <el-tooltip content="新增权限" placement="top">
            <el-button v-auth="'add'" class="btn" text icon="Plus" @click="openDrawer('新增')" />
          </el-tooltip>
          <el-tooltip content="编辑权限" placement="top">
            <el-button v-auth="'edit'" class="btn" text icon="Edit" @click="openDrawer('编辑')" />
          </el-tooltip>
          <el-tooltip content="删除权限" placement="top">
            <el-button v-auth="'delete'" class="btn" text icon="Delete" @click="deletePer" />
          </el-tooltip>
        </div>
      </template>
    </TreeFilter>
    <div class="table-box" v-if="initParam">
      <el-card>
        <el-descriptions title="基础信息">
          <el-descriptions-item label="权限名称">{{ initParam.name }}</el-descriptions-item>
          <el-descriptions-item label="权限标识">{{ initParam.identification }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-switch
              :disabled="!canEditStatus"
              :value="initParam.status"
              inline-prompt
              active-text="启用"
              inactive-text="禁用"
              active-value="1"
              inactive-value="0"
              @change="editStatus"
            />
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
      <ProTable
        ref="proTable"
        title="权限功能"
        row-key="path"
        :indent="20"
        :columns="columns"
        :data="initParam?.actionBodyList"
        :tool-button="[]"
      >
        <!-- 表格 header 按钮 -->
        <template #tableHeader>
          <el-button v-auth="'add'" type="primary" :icon="CirclePlus" @click="openBtnDrawerRef('新增')">新增</el-button>
        </template>
        <!-- 权限图标 -->
        <template #icon="scope">
          <el-icon :size="18">
            <component :is="scope.row.meta.icon"></component>
          </el-icon>
        </template>
        <!-- 权限操作 -->
        <template #operation="scope">
          <el-button
            v-auth="'edit'"
            link
            type="primary"
            :icon="EditPen"
            @click="openBtnDrawerRef('编辑', scope.row, scope.$index)"
          >
            编辑
          </el-button>
          <el-button v-auth="'delete'" link type="primary" :icon="Delete" @click="deleteButton(scope.row, scope.$index)">
            删除
          </el-button>
        </template>
      </ProTable>
      <EditDrawer ref="drawerRef" />
      <ButtonDrawer ref="btnDrawerRef" />
    </div>
  </div>
</template>

<script setup lang="ts" name="menuMange">
import { ref, onBeforeMount } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { Delete, EditPen, CirclePlus } from "@element-plus/icons-vue";
import {
  getPermissionList,
  addPermission,
  editPermission,
  deletePermission,
  editPermissionStatus
} from "@/api/modules/permission";
import { Permission } from "@/api/interface";
import ProTable from "@/components/ProTable/index.vue";
import EditDrawer from "./EditDrawer.vue";
import ButtonDrawer from "./ButtonDrawer.vue";
import TreeFilter from "@/components/TreeFilter/index.vue";
import { useHandleData } from "@/hooks/useHandleData";
import { useHasAuth } from "@/hooks/useHasAuth";

const hasAuth = useHasAuth(["edit", "delete"]);
const canEditStatus = useHasAuth(["editStatus"]);

const proTable = ref();
const initParam = ref<Permission.Response>();
let currentData: Permission.Response;

const treeFilterData = ref<Permission.Response[]>([]);
const getTreeFilter = async () => {
  const { data } = await getPermissionList();
  treeFilterData.value = data;
  if (initParam.value?.id) {
    let index = data.findIndex(item => item.id === initParam.value?.id);
    let _index = index === -1 ? 0 : index;
    initParam.value = data[_index];
    currentData = JSON.parse(JSON.stringify(data[_index]));
  } else {
    initParam.value = data[0];
    currentData = JSON.parse(JSON.stringify(data[0]));
  }
};

// 树形筛选切换
const changeTreeFilter = (_: string, data: Permission.Response) => {
  initParam.value = data;
  currentData = JSON.parse(JSON.stringify(data));
};

// 删除权限功能信息
const deletePer = async () => {
  if (currentData && currentData.id) {
    await useHandleData(deletePermission, [currentData.id], `删除【${currentData.name}】权限`);
    getTreeFilter();
  }
};

// 修改权限状态
const editStatus = async () => {
  if (currentData && currentData.id) {
    await useHandleData(editPermissionStatus, { id: currentData.id }, `修改【${currentData.name}】状态`);
    getTreeFilter();
  }
};

// 删除权限按钮信息
const deleteButton = async (row: Permission.Action, index: number) => {
  if (currentData && currentData.id) {
    const { actionBodyList = [] } = currentData;
    let params = [...actionBodyList];
    params.splice(index, 1);
    await useHandleData(editPermission, { ...currentData, actionBodyList: params }, `删除【${row.name}】按钮`);
    getTreeFilter();
  }
};

// 表格配置项
const columns: ColumnProps[] = [
  { prop: "action", label: "编码", align: "left" },
  { prop: "name", label: "名称" },
  { prop: "description", label: "说明" },
  { prop: "operation", label: "操作", isShow: hasAuth, width: 250, fixed: "right" }
];

const drawerRef = ref<InstanceType<typeof EditDrawer> | null>(null);
const openDrawer = (title: string) => {
  drawerRef.value?.acceptParams({
    title,
    row: title === "编辑" ? currentData : {},
    api: title === "编辑" ? editPermission : addPermission,
    refresh: getTreeFilter
  });
};
const btnDrawerRef = ref<InstanceType<typeof ButtonDrawer> | null>(null);
const openBtnDrawerRef = (title: string, formData: Partial<Permission.Action> = {}, index?: number) => {
  btnDrawerRef.value?.acceptParams({
    title,
    row: currentData,
    formData,
    index,
    api: editPermission,
    refresh: getTreeFilter
  });
};

onBeforeMount(() => {
  getTreeFilter();
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
