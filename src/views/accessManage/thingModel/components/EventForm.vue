<template>
  <el-form ref="formRef" label-width="100px" :rules="rules" label-suffix=" :" :model="modelValue">
    <el-form-item label="名称" prop="name">
      <el-input v-model="modelValue.name" placeholder="请填写名称" clearable></el-input>
    </el-form-item>
    <el-form-item label="标识符" prop="identifier">
      <el-input v-model="modelValue.identifier" placeholder="请填写标识符" clearable></el-input>
    </el-form-item>
    <el-form-item label="事件类型" prop="type">
      <el-radio-group v-model="modelValue.type">
        <el-radio label="msg">信息</el-radio>
        <el-radio label="alert">告警</el-radio>
        <el-radio label="fault">故障</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="必选事件" prop="required">
      <el-radio-group v-model="modelValue.required">
        <el-radio label="1">是</el-radio>
        <el-radio label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="输出参数" prop="outputData">
      <DynamicFormItem @add="addParams" @edit="editParams" @delete="deleteParams" :data="modelValue.outputData" />
    </el-form-item>
    <el-form-item label="说明" prop="desc">
      <el-input type="textarea" v-model="modelValue.desc" placeholder="请填写说明" clearable></el-input>
    </el-form-item>
  </el-form>
  <DialogForm ref="dialogFormRef" @submit="handleSubmit" />
</template>

<script setup lang="ts" name="eventForm">
import { defineModel, ref, reactive } from "vue";
import { ThingModel } from "@/api/interface";
import DynamicFormItem from "./DynamicFormItem.vue";
import DialogForm from "./DialogForm.vue";
import { FormInstance } from "element-plus";

const modelValue = defineModel<ThingModel.Event>({
  default: {}
});
const rules = reactive({
  name: [{ required: true, message: "请输入名称" }],
  required: [{ required: true, message: "请选择是否必选事件" }],
  type: [{ required: true, message: "请选择事件类型" }],
  identifier: [{ required: true, message: "请输入标识符" }]
});

const editParamsIndex = ref<number>();
const formRef = ref<FormInstance>();

function handleSubmit(params?: ThingModel.Properties) {
  if (!params) return;
  if (dialogFormRef.value?.props.title === "编辑") {
    if (modelValue.value.outputData && editParamsIndex.value) {
      modelValue.value.outputData.splice(editParamsIndex.value, 1, params);
    }
  } else {
    if (modelValue.value.outputData) {
      modelValue.value.outputData.push(params);
    } else {
      modelValue.value.outputData = [params];
    }
  }
  console.log(modelValue.value);
}

const dialogFormRef = ref<InstanceType<typeof DialogForm>>();
function addParams() {
  dialogFormRef.value?.acceptParams({
    title: "新增",
    formData: {
      type: "int"
    }
  });
}
function editParams(formData: ThingModel.Properties, index: number) {
  editParamsIndex.value = index;
  dialogFormRef.value?.acceptParams({
    title: "编辑",
    formData: formData
  });
}
function deleteParams(index: number) {
  modelValue.value.outputData?.splice(index, 1);
}
defineExpose({
  formRef
});
</script>
<style></style>
