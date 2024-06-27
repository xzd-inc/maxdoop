<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}通知配置`">
    <el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :rules="rules" :model="drawerProps.row">
      <el-form-item label="通知方式" prop="notifyType">
        <el-select v-model="drawerProps.row!.notifyType" placeholder="请选择通知方式">
          <el-option v-for="device in notifyType" :key="device.value" :value="device.value" :label="device.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="notifyName">
        <el-input v-model="drawerProps.row!.notifyName" placeholder="请填写名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="provider">
        <el-select v-model="drawerProps.row!.provider" placeholder="请选择类型">
          <el-option v-for="device in provider" :key="device.value" :value="device.value" :label="device.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="RegionId" prop="regionId">
        <el-input v-model="drawerProps.row!.regionId" placeholder="请填写RegionId" clearable></el-input>
      </el-form-item>
      <el-form-item label="AccessKeyId" prop="accessKeyId">
        <el-input v-model="drawerProps.row!.accessKeyId" placeholder="AccessKeyId" clearable></el-input>
      </el-form-item>
      <el-form-item label="Secret" prop="secret">
        <el-input v-model="drawerProps.row!.secret" placeholder="请填写Secret" clearable></el-input>
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
import { Notice } from "@/api/interface";
import { notifyType, provider } from '@/utils/dict';

const rules = reactive({
  alarmName: [{ required: true, message: "请填写名称" }],
  notifyType: [{ required: true, message: "请选择通知方式" }],
  provider: [{ required: true, message: "请选择类型" }],
  regionId: [{ required: true, message: "请填写RegionId" }],
  accessKeyId: [{ required: true, message: "请填写AccessKeyId" }],
  secret: [{ required: true, message: "请填写Secret" }],
});

interface DrawerProps {
  title: string;
  row: Partial<Notice.NoticeParams>;
  api?: (params: any) => Promise<any>;
  refresh?: () => void;
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  title: "",
  row: {}
});

const acceptParams = (params: DrawerProps) => {
  drawerProps.value = {
    ...params,
    row: {
      ...params.row,
      regionId: params?.row?.configuration?.regionId,
      accessKeyId: params?.row?.configuration?.accessKeyId,
      secret: params?.row?.configuration?.secret
    }
  };
  drawerVisible.value = true;
};

const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  console.log(drawerProps.value);
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await drawerProps.value.api!({
        ...drawerProps.value.row,
        configuration: {
          regionId: drawerProps.value.row.regionId,
          accessKeyId: drawerProps.value.row.accessKeyId,
          secret: drawerProps.value.row.secret,
        },
      });
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
