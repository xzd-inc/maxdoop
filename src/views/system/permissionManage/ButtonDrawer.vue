<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}功能`">
    <el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :rules="rules" :model="drawerProps.formData">
      <el-form-item label="名称" prop="name">
        <el-input v-model="drawerProps.formData!.name" placeholder="请填写名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="编码" prop="action">
        <el-input v-model="drawerProps.formData!.action" placeholder="请填写编码" clearable></el-input>
      </el-form-item>
      <el-form-item label="说明" prop="description">
        <el-input v-model="drawerProps.formData!.description" placeholder="请填写说明" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { Permission } from "@/api/interface";

const rules = reactive({
  name: [{ required: true, message: "请填写名称" }],
  action: [{ required: true, message: "请填编码" }]
});

interface DrawerProps {
  title: string;
  row: Partial<Permission.Response>;
  formData: Partial<Permission.Action>;
  index?: number;
  api?: (params: any) => Promise<any>;
  refresh?: () => void;
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  title: "",
  row: {},
  formData: {}
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
      let { actionBodyList } = drawerProps.value.row;
      if (!actionBodyList) {
        actionBodyList = [];
      }
      let params: any[] = [...actionBodyList];

      if (drawerProps.value.title === "编辑" && typeof drawerProps.value.index === "number") {
        params.splice(drawerProps.value.index, 1, drawerProps.value.formData);
      } else {
        params.push(drawerProps.value.formData);
      }

      await drawerProps.value.api!({
        ...drawerProps.value.row,
        actionBodyList: params
      });
      ElMessage.success({ message: `${drawerProps.value.title}功能成功！` });
      drawerProps.value.refresh!();
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
