<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}菜单`">
    <el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :rules="rules" :model="drawerProps.row">
      <el-form-item label="菜单名称" prop="meta.title">
        <el-input v-model="drawerProps.row.meta!.title" placeholder="请填写菜单名称" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="isSupperManage" label="菜单标识" prop="code">
        <el-input v-model="drawerProps.row!.code" placeholder="请填写菜单标识" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="isSupperManage" label="路由地址" prop="path">
        <el-input v-model="drawerProps.row!.path" placeholder="请填写路由地址" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="isSupperManage" label="组件地址" prop="component">
        <el-input v-model="drawerProps.row!.component" placeholder="请填写组件地址" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="isSupperManage" label="激活标识" prop="meta.activeMenu">
        <el-input v-model="drawerProps.row.meta!.activeMenu" placeholder="请填写激活标识" clearable></el-input>
      </el-form-item>
      <el-form-item label="菜单图标" prop="meta.icon">
        <SelectIcon v-model:icon-value="drawerProps.row.meta!.icon" />
      </el-form-item>
      <el-form-item label="是否启用" prop="status">
        <el-switch v-model="drawerProps.row.status" active-value="1" inactive-value="0" />
      </el-form-item>
      <el-form-item label="是否隐藏" prop="meta.isHide">
        <el-switch v-model="drawerProps.row.meta!.isHide" />
      </el-form-item>
      <el-form-item label="菜单权限">
        <Permission v-model="drawerProps.row.permissionBodyList" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="MenusDrawer">
import { ref, reactive, computed } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { Menus } from "@/api/interface";
import SelectIcon from "@/components/SelectIcon/index.vue";
import Permission from "./Permission.vue";
import { useUserStore } from "@/stores/modules/user";

const rules = reactive({
  "meta.title": [{ required: true, message: "请填写菜单名称" }],
  code: [{ required: true, message: "请填写菜单标识" }],
  path: [{ required: true, message: "请填写路由地址" }],
  component: [{ required: true, message: "请填写组件地址" }],
  "meta.icon": [{ required: true, message: "请选择菜单图标" }]
});

interface DrawerProps {
  title: string;
  row: Partial<Menus.Response>;
  api?: (params: any) => Promise<any>;
  refreshList?: () => void;
}

const userStore = useUserStore();
const isSupperManage = computed(() => userStore.userInfo.userType === "1");

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  title: "",
  row: {
    path: "",
    code: "",
    status: "0",
    meta: {
      icon: "",
      title: "",
      isHide: false
    }
  }
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params;
  drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await drawerProps.value.api!(drawerProps.value.row);
      ElMessage.success({ message: `${drawerProps.value.title}用户成功！` });
      drawerProps.value.refreshList!();
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

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
