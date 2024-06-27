<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}通知模板`">
    <el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :rules="rules" :model="drawerProps.row">
      <el-form-item label="通知方式" prop="notifyType">
        <el-select v-model="drawerProps.row!.notifyType" placeholder="请选择通知方式">
          <el-option v-for="device in notifyType" :key="device.value" :value="device.value" :label="device.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="templateName">
        <el-input v-model="drawerProps.row!.templateName" placeholder="请填写名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="provider">
        <el-select v-model="drawerProps.row!.provider" placeholder="请选择类型">
          <el-option v-for="device in provider" :key="device.value" :value="device.value" :label="device.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="绑定配置" prop="notifyConfigId">
        <el-select v-model="drawerProps.row!.notifyConfigId" placeholder="请选择绑定配置">
          <el-option v-for="item in modules" :key="item.id" :value="item.id" :label="item.notifyName" />
        </el-select>
      </el-form-item>
      <el-form-item label="模板" prop="templateId">
        <el-input v-model="drawerProps.row!.templateId" placeholder="请填写模板" clearable></el-input>
      </el-form-item>
      <el-form-item label="收信人" prop="receiver">
        <el-input v-model="drawerProps.row!.receiver" placeholder="请填写收信人" clearable></el-input>
      </el-form-item>
      <el-form-item label="签名" prop="signature">
        <el-input v-model="drawerProps.row!.signature" placeholder="请填写签名" clearable></el-input>
      </el-form-item>
      <el-form-item label="模板内容" prop="content">
        <el-input v-model="drawerProps.row!.content" placeholder="请填写模板内容" clearable></el-input>
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
import { ref, reactive, onMounted } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { Notice } from "@/api/interface";
import { notifyType, provider } from '@/utils/dict';
import { getNoticeParamsList } from "@/api/modules/notice";

const rules = reactive({
  templateName: [{ required: true, message: "请填写名称" }],
  notifyType: [{ required: true, message: "请选择通知方式" }],
  provider: [{ required: true, message: "请选择类型" }],
  notifyConfigId: [{ required: true, message: "请填写绑定配置" }],
  templateId: [{ required: true, message: "请填写模板" }],
  signature: [{ required: true, message: "请填写签名" }],
  content: [{ required: true, message: "请填写模板内容" }],
});

interface DrawerProps {
  title: string;
  row: Partial<Notice.NoticeTempate>;
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
      templateId: params.row.template?.templateId,
      receiver: params.row.template?.receiver,
      signature: params.row.template?.signature,
      content: params.row.template?.content,
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
        template: {
          templateId: drawerProps.value.row.templateId,
          receiver: drawerProps.value.row.receiver,
          signature: drawerProps.value.row.signature,
          content: drawerProps.value.row.content,
        }},);
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

const modules = reactive<Array<any>>([])

onMounted(() => {
  getNoticeParamsList().then(res => {
    modules.push(...res.data)
  })
})
</script>

<style>
.icon {
  vertical-align: middle;
  font-size: 24px;
}
</style>
