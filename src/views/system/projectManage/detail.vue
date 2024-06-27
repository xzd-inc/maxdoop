<template>
  <div class="main-box">
    <div class="main-left card">
      <div class="mf-title">项目菜单</div>
      <el-tree :data="menusTreeData" default-expand-all />
    </div>
    <div class="container">
      <el-card>
        <template #header>
          <div class="mf-title">基础信息</div>
        </template>
        <el-descriptions>
          <el-descriptions-item label="项目名">{{ detail?.projectName }}</el-descriptions-item>
          <el-descriptions-item label="说明">{{ detail?.description }}</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ detail?.createTime }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card class="box-card table">
        <template #header>
          <div class="mf-title">用户列表</div>
        </template>
        <ProTable
          ref="proTable"
          :columns="columns"
          :request-auto="false"
          :request-api="getUserByProjectIdApi"
          :init-param="initParam"
          :data="userList"
          :tool-button="false"
          :default-expand-all="true"
          :pagination="false"
        >
          <template #tableHeader>
            <el-button type="primary" :icon="CirclePlus" @click="openUserDialog">绑定用户</el-button>
          </template>
          <template #operation="scope">
            <el-button type="primary" link :icon="Delete" @click="unbindProjectUser(scope.row)">移除</el-button>
          </template>
        </ProTable>
      </el-card>
      <UserDialog :bind-user-list="proTable?.tableData" ref="userDialogRef" />
    </div>
  </div>
</template>

<script setup lang="tsx" name="roleDetail">
import { useRoute } from "vue-router";
import { ref, onMounted, reactive } from "vue";
import { getProjectDetailApi, setProjectAdminApi, unbindProjectUserApi, getCodeByProjectId } from "@/api/modules/project";
import { getUserByProjectIdApi } from "@/api/modules/user";
import { Project, User, Menus } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import ProTable from "@/components/ProTable/index.vue";
import { Delete, CirclePlus } from "@element-plus/icons-vue";
import { getMenusTreeApi } from "@/api/modules/menus";
import UserDialog from "./UserDialog.vue";

const route = useRoute();
const detail = ref<Project.Response>();
const userList = ref<User.ResUserList[]>();
const menusTreeData = ref<Menus.Response[]>();
// const menusTreeProps = reactive({
//   label: (data: Menus.Response) => data.meta.title
// });

// ProTable 实例
const proTable = ref<ProTableInstance>();
const userDialogRef = ref();
const initParam = reactive({ projectId: "" });

// 表格配置项
const columns = reactive<ColumnProps<User.ResUserList>[]>([
  {
    prop: "account",
    label: "账号"
  },
  {
    prop: "userName",
    label: "名称"
  },
  {
    prop: "isAdmin",
    label: "是否管理员",
    render: scope => {
      return (
        <el-switch
          type="primary"
          v-model={scope.row.isAdmin}
          before-change={() => setProjectAdmin(scope.row)}
          inline-prompt
          active-text="是"
          inactive-text="否"
          active-value="1"
          inactive-value="0"
        ></el-switch>
      );
    }
  },
  {
    prop: "remark",
    label: "描述"
  },
  {
    prop: "createTime",
    label: "创建时间"
  },
  {
    prop: "operation",
    label: "创建时间"
  }
]);

// 设置项目管理员
const setProjectAdmin = async (params: User.ResUserList) => {
  await useHandleData(
    setProjectAdminApi,
    { currentUser: params.id, projectId: detail.value?.projectId },
    params.isAdmin === "0" ? `设置【${params.userName}】为管理员` : `设置【${params.userName}】为普通人员`
  );
  proTable.value?.getTableList();
  return false;
};

// 解绑项目用户
const unbindProjectUser = async (params: User.ResUserList) => {
  await useHandleData(
    unbindProjectUserApi,
    { currentUser: params.id, projectId: detail.value?.projectId },
    `移除【${params.userName}】`
  );
  proTable.value?.getTableList();
};

// 绑定项目用户
const openUserDialog = () => {
  userDialogRef.value.acceptParams({
    projectInfo: detail,
    getTableList: proTable.value?.getTableList
  });
};

// 过滤菜单树
function filterMenusTree(codes: string[], menusTrees: Menus.Response[]) {
  let trees: any[] = [];
  function loop(trees: Menus.Response[]) {
    let tree: any[] = [];
    for (let i = 0; i < trees.length; i++) {
      const item = trees[i];
      if (codes.includes(item.code)) {
        tree.push({
          label: item.meta.title,
          id: item.code,
          children: item.children && item.children.length > 0 ? loop(item.children) : []
        });
      }
    }
    return tree;
  }
  if (menusTrees) {
    trees = loop(menusTrees);
  }

  menusTreeData.value = trees;
}

// 获取详情信息
async function getDetail() {
  const { data } = await getProjectDetailApi({ id: route.params.id });
  initParam.projectId = data.projectId;
  detail.value = data;
  const { data: menus } = await getMenusTreeApi();
  const { data: codes } = await getCodeByProjectId({ projectId: data.projectId });
  filterMenusTree(codes, menus);
}

onMounted(() => {
  getDetail();
});
</script>

<style lang="scss" scoped>
@import "@/styles/element.scss";
.main-left {
  width: 230px;
  margin-right: 10px;
  .mf-title {
    border-bottom: 1px solid var(--el-border-color-light);
    padding-bottom: 16px;
    margin-bottom: 10px;
  }
}
.container {
  height: 100%;
  width: calc(100% - 230px);
  :deep(.el-tabs__header) {
    @include card;
    padding: 0 20px;
    margin-bottom: 10px;
    .el-tabs__nav-wrap::after {
      height: 0;
    }
  }
}
.box-card {
  margin-top: 10px;
}
.table {
  :deep(.el-card__body) {
    height: calc(100vh - 390px);
  }
}
</style>
