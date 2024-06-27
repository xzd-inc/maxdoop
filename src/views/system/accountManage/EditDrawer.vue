<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}用户`">
    <el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :rules="rules" :model="drawerProps.row">
      <el-form-item label="账户" prop="account">
        <el-input
          v-model="drawerProps.row!.account"
          :disabled="drawerProps.title === '编辑'"
          placeholder="请填写账户"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item v-if="drawerProps.title === '新增'" label="密码" prop="password">
        <el-input v-model="drawerProps.row!.password" placeholder="请填写密码" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户名称" prop="userName">
        <el-input v-model="drawerProps.row!.userName" placeholder="请填写用户名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roleIds">
        <el-select v-model="drawerProps.row!.roleIds" multiple placeholder="请选择角色">
          <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="PermissionDrawer">
import { ref, reactive, onMounted, watch } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { User } from "@/api/interface";
import { getAllRoleList } from "@/api/modules/role";
import { getUserDetail } from "@/api/modules/user";

const rules = reactive({
  userName: [{ required: true, message: "请填写用户名称" }],
  password: [{ required: true, message: "请填写密码" }],
  account: [{ required: true, message: "请填写账户" }]
});

interface DrawerProps {
  title: string;
  row: Partial<User.ReqUserParams>;
  api?: (params: any) => Promise<any>;
  refresh?: () => void;
}

const roleList = ref();
const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  title: "",
  row: {}
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params;
  drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  console.log(drawerProps.value);
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await drawerProps.value.api!(drawerProps.value.row);
      ElMessage.success({ message: `${drawerProps.value.title}用户成功！` });
      drawerProps.value.refresh!();
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

async function getRoleList() {
  const { data } = await getAllRoleList();
  roleList.value = data;
}

async function getDetail() {
  if (drawerProps.value.title === "编辑") {
    const { data } = await getUserDetail({ userId: drawerProps.value.row.id });
    drawerProps.value.row.roleIds = data.roleDtos.map(item => item.id);
  }
}

onMounted(() => {
  getRoleList();
});

watch(drawerProps, getDetail);

defineExpose({
  acceptParams
});
</script>

<style>
.icon {
  vertical-align: middle;
  font-size: 24px;
}
</style>
