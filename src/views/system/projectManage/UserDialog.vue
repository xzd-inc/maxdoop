<template>
  <el-dialog v-model="dialogVisible" title="绑定用户" :destroy-on-close="true" width="800px" draggable>
    <ProTable ref="proTable" :columns="columns" :request-api="getAllUserList" :tool-button="false">
      <template #operation="scope">
        <el-button :disabled="isBind(scope.row.id)" type="primary" link :icon="Plus" @click="open(scope.row)">绑定</el-button>
      </template>
    </ProTable>
  </el-dialog>
</template>

<script setup lang="ts" name="UserDialog">
import { ref, reactive } from "vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import ProTable from "@/components/ProTable/index.vue";
import { Project, User } from "@/api/interface";
import { getAllUserList } from "@/api/modules/user";
import { bindProjectUserApi } from "@/api/modules/project";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { Action } from "element-plus";

interface Props {
  bindUserList?: User.ResUserList[];
}

const props = defineProps<Props>();

export interface UserDialogProps {
  projectInfo?: Project.Response;
  getTableList?: () => void; // 获取表格数据的Api
}

// ProTable 实例
const proTable = ref<ProTableInstance>();
// dialog状态
const dialogVisible = ref(false);
// 父组件传过来的参数
const parameter = ref<UserDialogProps>({});

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
    prop: "remark",
    label: "描述"
  },
  {
    prop: "operation",
    label: "操作"
  }
]);

// 判断是否已选择
function isBind(id: string): boolean {
  if (props.bindUserList) {
    return props.bindUserList.some(item => item.id === id);
  }
  return false;
}

const bindProjectUser = async (params: User.ResUserList, isAdmin: string) => {
  await bindProjectUserApi({
    currentUser: params.id,
    projectId: parameter.value.projectInfo?.projectId,
    isAdmin
  });
  parameter.value.getTableList!();
  ElMessage({
    type: "success",
    message: "绑定成功"
  });
};
// 绑定项目用户
const open = async (params: User.ResUserList) => {
  ElMessageBox.confirm(`确认将【${params.userName}】绑定到【${parameter.value.projectInfo?.projectName}】项目？`, "温馨提示", {
    distinguishCancelAndClose: true,
    confirmButtonText: "绑定为管理员",
    cancelButtonText: "绑定为普通用户"
  })
    .then(async () => {
      bindProjectUser(params, "1");
    })
    .catch(async (action: Action) => {
      if (action === "cancel") {
        bindProjectUser(params, "0");
      }
    });
};

// 接收父组件参数
const acceptParams = (params: UserDialogProps) => {
  parameter.value = params;
  dialogVisible.value = true;
};

defineExpose({
  acceptParams
});
</script>
<style lang="scss" scoped></style>
