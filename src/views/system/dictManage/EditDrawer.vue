<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}字典`">
    <el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :rules="rules" :model="drawerProps.row">
      <el-form-item label="字典名称" prop="name">
        <el-input v-model="drawerProps.row!.name" placeholder="请填写字典名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="字典标识" prop="code">
        <el-input
          :disabled="drawerProps.title === '编辑'"
          v-model="drawerProps.row!.code"
          placeholder="请填写字典标识"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="drawerProps.row!.remark" placeholder="请填写描述" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="PermissionDrawer">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { Dict } from "@/api/interface";

const rules = reactive({
  name: [{ required: true, message: "请填写字典名称" }],
  code: [{ required: true, message: "请填写字典标识" }]
});

interface DrawerProps {
  title: string;
  row: Partial<Dict.Source>;
  api?: (params: any) => Promise<any>;
  refresh?: () => void;
}

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
      ElMessage.success({ message: `${drawerProps.value.title}字典成功！` });
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
