<template>
  <div class="table-box">
    <ProTable ref="proTable" :columns="columns" :request-api="getRoleList" :init-param="initParam" :tool-button="['refresh']">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button v-auth="['add']" type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增角色</el-button>
      </template>
      <!-- Expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <!-- createTime -->
      <template #createTime="scope">
        <el-button type="primary" link @click="ElMessage.success('我是通过作用域插槽渲染的内容')">
          {{ scope.row.createTime }}
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" v-auth="['view']" link :icon="View" @click="toDetail(scope.row.id)">详情</el-button>
        <el-button type="primary" v-auth="['edit']" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button type="primary" v-auth="['delete']" link :icon="Delete" @click="deleteRole(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <EditDrawer ref="drawerRef" />
  </div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { Role } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { ElMessage } from "element-plus";
import ProTable from "@/components/ProTable/index.vue";
import EditDrawer from "./EditDrawer.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import { getRoleList, addRoleApi, editRoleApi, deleteRoleApi } from "@/api/modules/role";
import { useHasAuth } from "@/hooks/useHasAuth";

const hasAuth = useHasAuth(["view", "edit", "delete"]);

const router = useRouter();

// 跳转详情页
const toDetail = (id: string) => {
  router.push(`/system/roleManage/detail/${id}`);
};

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 如果表格需要初始化请求参数，直接定义传给 ProTable (之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({ type: 1 });

// 表格配置项
const columns = reactive<ColumnProps<Role.Response>[]>([
  {
    prop: "searchText",
    label: "搜索",
    isShow: false,
    search: { el: "input", tooltip: "输入名字搜索" }
  },
  {
    prop: "roleName",
    label: "名称"
    // render: scope => {
    //   return (
    //     <el-button type="primary" link onClick={() => toDetail(scope.row.id)}>
    //       {scope.row.roleName}
    //     </el-button>
    //   );
    // }
  },
  {
    prop: "remark",
    label: "描述"
  },
  {
    prop: "createTime",
    label: "创建时间"
  },
  { prop: "operation", isShow: hasAuth, label: "操作", fixed: "right", width: 260 }
]);

// 删除角色信息
const deleteRole = async (params: Role.Response) => {
  await useHandleData(deleteRoleApi, [params.id], `删除【${params.roleName}】角色`);
  proTable.value?.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof EditDrawer> | null>(null);
const openDrawer = (title: string, row: Partial<Role.Response> = {}) => {
  const params = {
    title,
    row: { ...row },
    api: title === "新增" ? addRoleApi : editRoleApi,
    refresh: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};
</script>
