<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}协议`">
    <el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :rules="rules" :model="drawerProps.row">
      <el-form-item label="名称" prop="protocolName">
        <el-input v-model="drawerProps.row!.protocolName" placeholder="请填写名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select  v-model="drawerProps.row!.type" placeholder="请填写类型" disabled>
          <el-option v-for="item in protocolType" :key="item.value" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标识" prop="pluginUri">
        <el-input v-model="drawerProps.row!.pluginUri" placeholder="请填写名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="文件" prop="attachmentIds">
        <UploadFile v-model="drawerProps.row!.attachmentIds" />
      </el-form-item>
      <el-form-item label="说明" prop="roleIds">
        <el-input type="textarea" v-model="drawerProps.row!.remark" placeholder="请填写说明" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="protocolDrawer">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance, genFileId } from "element-plus";
import { Protocol } from "@/api/interface";
import { protocolType } from "@/utils/dict";
import type { UploadProps, UploadInstance, UploadRawFile } from "element-plus";
import UploadFile from '@/components/Upload/File.vue'


interface DrawerProps {
  title: string;
  row: Partial<Protocol.Update>;
  api?: (params: any) => Promise<any>;
  refresh?: () => void;
}

const ruleFormRef = ref<FormInstance>();
const upload = ref<UploadInstance>();
const fileList = ref();
const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  title: "",
  row: {
    type: ''
  }
});
const rules = reactive({
  protocolName: [{ required: true, message: "请填写协议名称" }],
  type: [{ required: true, message: "请输入文件类型" }],
  pluginUri: [{ required: true, message: "请输入" }]
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params;
  drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      const { row } = drawerProps.value;
      const params = {
        ...row,
        type: "1",
        attachmentIds: row?.attachmentIds?.map(v => v.id),
      };
      await drawerProps.value.api!(params);
      ElMessage.success({ message: `${drawerProps.value.title}协议成功！` });
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
.upload {
  width: 100%;
}
</style>
