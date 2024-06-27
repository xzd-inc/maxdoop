<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}订阅`">
    <el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :rules="rules" :model="drawerProps.row">
      <el-form-item label="产品ID" prop="id">
        <el-input
          v-model="drawerProps.row!.name"
          :disabled="drawerProps.title === '编辑'"
          placeholder="请填写产品ID"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="消息类别" prop="type">
        <el-select v-model="drawerProps.row!.name" placeholder="请选择消息类别">
          <el-option label="设备数据变化通知" />
          <el-option label="设备指令响应通知" />
          <el-option label="设备事件上报通知" />
          <el-option label="设备上下线通知" />
          <el-option label="创建删除设备通知" />
        </el-select>
      </el-form-item>
      <el-form-item label="订阅级别" prop="name">
        <el-input
          v-model="drawerProps.row!.name"
          :disabled="drawerProps.title === '编辑'"
          placeholder="请填写订阅级别"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="订阅方URL" prop="roleIds">
        <el-input type="textarea" v-model="drawerProps.row!.remark" placeholder="请填写说明" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="productDrawer">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { Product } from "@/api/interface";

interface DrawerProps {
  title: string;
  row: Partial<Product.Response>;
  api?: (params: any) => Promise<any>;
  refresh?: () => void;
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  title: "",
  row: {
    type: "jar"
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
  console.log(drawerProps.value);
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await drawerProps.value.api!(drawerProps.value.row);
      ElMessage.success({ message: `${drawerProps.value.title}产品成功！` });
      drawerProps.value.refresh!();
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

const rules = reactive({
  name: [{ required: true, message: "请填写产品名称" }],
  type: [{ required: true, message: "请输入文件类型" }],
  file: [{ required: true, message: "请上传文件" }]
});

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
