<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" :size="600" :title="`${drawerProps.title}规则`">
    <el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :rules="rules" :model="drawerProps.row">
      <el-form-item label="名称" prop="ruleName">
        <el-input v-model="drawerProps.row!.ruleName" placeholder="请填写名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="触发方式" prop="ruleType">
        <el-select v-model="drawerProps.row!.ruleType" placeholder="请选择触发方式">
          <el-option v-for="device in ruleType" :key="device.value" :value="device.value" :label="device.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="说明" prop="remark">
        <el-input v-model="drawerProps.row!.remark" placeholder="请填写说明"></el-input>
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
import { ruleEngine } from "@/api/interface";
import { ruleType } from '@/utils/dict';

const rules = reactive({
  ruleName: [{ required: true, message: "请填写名称" }],
  ruleType: [{ required: true, message: "请选择触发方式" }]
});

interface DrawerProps {
  title: string;
  row: Partial<ruleEngine.linkage>;
  api?: (params: any) => Promise<any>;
  refresh?: () => void;
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  title: "",
  row: {}
});

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
      ElMessage.success({ message: `${drawerProps.value.title}成功！` });
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

<style scoped>
.icon {
  vertical-align: middle;
  font-size: 24px;
}
</style>
