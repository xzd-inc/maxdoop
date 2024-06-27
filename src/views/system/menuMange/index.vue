<template>
  <div class="main-box">
    <TreeFilter
      label="label"
      title="菜单列表"
      :data="menuData"
      :extra-height="32"
      :default-value="initParam.id"
      @change="changeTreeFilter"
    >
      <template #tool>
        <div class="flx-justify-between tool">
          <el-tooltip content="新增菜单" placement="top">
            <el-button v-auth="'add'" class="btn" text icon="Plus" @click="openDrawer('新增')" />
          </el-tooltip>
          <el-tooltip content="编辑菜单" placement="top">
            <el-button v-auth="'edit'" class="btn" text icon="Edit" @click="openDrawer('编辑')" />
          </el-tooltip>
          <el-tooltip content="删除菜单" placement="top">
            <el-button v-auth="'delete'" class="btn" text icon="Delete" @click="deleteMenu" />
          </el-tooltip>
        </div>
      </template>
    </TreeFilter>
    <div class="table-box">
      <el-card>
        <el-descriptions title="基础信息">
          <el-descriptions-item label="菜单名称">{{ menuDetail?.meta?.title }}</el-descriptions-item>
          <el-descriptions-item label="菜单路由">{{ menuDetail?.path }}</el-descriptions-item>
          <el-descriptions-item label="菜单标识">{{ menuDetail?.code }}</el-descriptions-item>
          <el-descriptions-item label="组件路径">{{ menuDetail?.component }}</el-descriptions-item>
          <el-descriptions-item label="菜单图标">
            <el-icon :size="22" style="vertical-align: top">
              <component :is="menuDetail?.meta?.icon" />
              <!-- <HomeFilled /> -->
            </el-icon>
          </el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-switch
              :disabled="!canEditStatus"
              :value="menuDetail?.status"
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
        title="菜单按钮"
        row-key="path"
        :indent="20"
        :columns="columns"
        :data="menuDetail?.buttonBodyList"
        :tool-button="[]"
      >
        <!-- 表格 header 按钮 -->
        <template #tableHeader>
          <el-button type="primary" v-auth="'add'" :icon="CirclePlus" @click="openBtnDrawerRef('新增')">新增</el-button>
        </template>
        <!-- 菜单图标 -->
        <template #icon="scope">
          <el-icon :size="18">
            <component :is="scope.row.meta.icon"></component>
          </el-icon>
        </template>
        <!-- 菜单操作 -->
        <template #operation="scope">
          <el-button
            type="primary"
            v-auth="'edit'"
            link
            :icon="EditPen"
            @click="openBtnDrawerRef('编辑', scope.row, scope.$index)"
          >
            编辑
          </el-button>
          <el-button type="primary" v-auth="'delete'" link :icon="Delete" @click="deleteButton(scope.row, scope.$index)">
            删除
          </el-button>
        </template>
      </ProTable>
      <MenuDrawer ref="drawerRef" />
      <ButtonDrawer ref="btnDrawerRef" />
    </div>
  </div>
</template>

<script setup lang="ts" name="menuMange">
import { ref, onBeforeMount, watch, toRaw } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { Delete, EditPen, CirclePlus } from "@element-plus/icons-vue";
import { getMenusTreeApi, addMenus, editMenus, deleteMenuApi, getMenusDetailApi, editMenuStatus } from "@/api/modules/menus";
import { useHandleData } from "@/hooks/useHandleData";
import { Menus, Status } from "@/api/interface";
import ProTable from "@/components/ProTable/index.vue";
import MenuDrawer from "./MenuDrawer.vue";
import ButtonDrawer from "./ButtonDrawer.vue";
import TreeFilter from "@/components/TreeFilter/index.vue";
import { useHasAuth } from "@/hooks/useHasAuth";

const hasAuth = useHasAuth(["edit", "delete"]);
const canEditStatus = useHasAuth(["editStatus"]);

const defaultProps = {
  path: "",
  code: "",
  component: "",
  meta: {
    title: "",
    icon: ""
  },
  status: "0" as Status
};

const proTable = ref();
const menuData = ref();
const initParam = ref<Menus.Response>({
  id: "",
  ...defaultProps
} as Menus.Response);
const menuDetail = ref<Menus.Response>();

let currentData = {};

// 树形筛选切换
const changeTreeFilter = (_: string, data: Menus.Response) => {
  initParam.value = data;
  currentData = JSON.parse(JSON.stringify(data));
};

// 表格配置项
const columns: ColumnProps[] = [
  { prop: "id", label: "编码", align: "left" },
  { prop: "name", label: "名称" },
  { prop: "description", label: "说明" },
  { prop: "operation", label: "操作", isShow: hasAuth, width: 250, fixed: "right" }
];

// 删除菜单信息
const deleteMenu = async () => {
  if (initParam.value && initParam.value.id) {
    await useHandleData(deleteMenuApi, [initParam.value.id], `删除【${initParam.value.meta.title}】菜单`);
    getMenusTree();
  }
};

// 获取菜单详情
const getMenusDetail = async () => {
  if (!initParam.value.id) return;
  const { data } = await getMenusDetailApi({ menuId: initParam.value.id });
  menuDetail.value = data;
  currentData = JSON.parse(JSON.stringify(data));
};

// 修改权限状态
const editStatus = async () => {
  if (initParam.value && initParam.value.id) {
    await useHandleData(editMenuStatus, { id: initParam.value.id }, `修改【${initParam.value.meta.title}】状态`);
    getMenusTree();
  }
};

// 删除菜单按钮信息
const deleteButton = async (row: Menus.ButtonBody, index: number) => {
  if (!initParam.value.id) return;
  const { buttonBodyList = [] } = initParam.value;
  let params = [...buttonBodyList];
  params.splice(index, 1);
  await useHandleData(editMenus, { ...initParam.value, buttonBodyList: params }, `删除【${row.name}】按钮`);
  getMenusTree();
};

const drawerRef = ref<InstanceType<typeof MenuDrawer> | null>(null);
const openDrawer = (title: string) => {
  const { id } = initParam.value;
  if (!id && title === "编辑") {
    return;
  }
  let params: Partial<Menus.Response>;
  if (title === "新增") {
    params = {
      parentId: id,
      ...defaultProps
    };
  } else {
    params = toRaw(menuDetail.value) as Menus.Response;
  }
  drawerRef.value?.acceptParams({
    title,
    row: JSON.parse(JSON.stringify(params)),
    api: title === "新增" ? addMenus : editMenus,
    refreshList: getMenusTree
  });
};
const btnDrawerRef = ref<InstanceType<typeof ButtonDrawer> | null>(null);
const openBtnDrawerRef = (title: string, params = {}, index?: number) => {
  btnDrawerRef.value?.acceptParams({
    title,
    row: currentData,
    index,
    formData: { ...params },
    api: editMenus,
    refreshList: getMenusTree
  });
};

function formateData(data) {
  function loop(data) {
    return data.map(item => ({
      ...item,
      label: item.meta?.title || "--",
      children: item.children && item.children.length > 0 ? loop(item.children) : []
    }));
  }
  return loop(data);
}

function findCurrentSelectMenu(id: string, tree: Menus.Response[]) {
  let currentSelectMenu: Menus.Response | undefined;
  for (let i = 0; i < tree.length; i++) {
    const item = tree[i];
    if (item.id === id) {
      return item;
    }
    if (item.children && item.children.length > 0) {
      currentSelectMenu = findCurrentSelectMenu(id, item.children);
      if (currentSelectMenu) {
        return currentSelectMenu;
      }
    }
  }
  return currentSelectMenu;
}

async function getMenusTree() {
  const { data } = await getMenusTreeApi();
  menuData.value = formateData(data);
  if (initParam.value?.id) {
    let currentSelectMenu = findCurrentSelectMenu(initParam.value?.id, menuData.value);
    if (currentSelectMenu) {
      initParam.value = currentSelectMenu;
    }
  } else {
    initParam.value = data[0];
  }
}

watch(initParam, () => {
  getMenusDetail();
});

onBeforeMount(() => {
  getMenusTree();
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
</style>
