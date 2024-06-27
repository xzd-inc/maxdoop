<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}告警配置`">
    <el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :rules="rules" :model="drawerProps.row">
      <el-form-item label="名称" prop="alarmName">
        <el-input v-model="drawerProps.row!.alarmName" placeholder="请填写名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="alarmType">
        <el-select v-model="drawerProps.row!.alarmType" placeholder="请选择告警类型">
          <el-option v-for="device in alarmType" :key="device.value" :value="device.value" :label="device.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="级别" prop="alarmLevel">
        <el-select v-model="drawerProps.row!.alarmLevel" placeholder="请选择告警级别">
          <el-option v-for="device in alarmLevel" :key="device.value" :value="device.value" :label="device.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="说明" prop="remark">
        <el-input v-model="drawerProps.row!.remark" placeholder="请填写说明" clearable></el-input>
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
import { Alarm } from "@/api/interface";
import { alarmType, alarmLevel } from '@/utils/dict';

const rules = reactive({
  alarmName: [{ required: true, message: "请填写名称" }],
  alarmType: [{ required: true, message: "请选择类型" }],
  alarmLevel: [{ required: true, message: "请选择级别" }]
});

interface DrawerProps {
  title: string;
  row: Partial<Alarm.AlarmParams>;
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

<style>
.icon {
  vertical-align: middle;
  font-size: 24px;
}
</style>
