<template>
  <el-form ref="formRef" label-width="100px" :rules="rules" label-suffix=" :" :model="modelValue">
    <el-form-item label="名称" prop="name">
      <el-input v-model="modelValue.name" placeholder="请填写名称" clearable></el-input>
    </el-form-item>
    <el-form-item label="标识符" prop="identifier">
      <el-input v-model="modelValue.identifier" placeholder="请填写标识符" clearable></el-input>
    </el-form-item>
    <el-form-item label="组件" prop="componentId">
      <RequestSelect
      placeholder="请选择组件" 
      v-model="modelValue.componentId"
      :api="() => getComponent({thingId})"
      label="networkName"
      />
    </el-form-item>
    <el-form-item label="调用方式" prop="callType">
      <el-radio-group v-model="modelValue.callType" class="ml-4">
        <el-radio label="0">异步</el-radio>
        <el-radio label="1">同步</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="输入参数" prop="inputData">
      <DynamicFormItem
        @add="addData('inputData')"
        @edit="(formData, index) => editData(formData, index, 'inputData')"
        @delete="deleteInputData"
        :data="modelValue.inputData"
      />
    </el-form-item>
    <el-form-item label="输出参数" prop="outputData">
      <DynamicFormItem
        @add="addData('outputData')"
        @edit="(formData, index) => editData(formData, index, 'outputData')"
        @delete="deleteOutputData"
        :data="modelValue.outputData"
      />
    </el-form-item>
    <el-form-item label="必选服务" prop="required">
      <el-radio-group v-model="modelValue.required">
        <el-radio label="1">是</el-radio>
        <el-radio label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="说明" prop="desc">
      <el-input type="textarea" v-model="modelValue.desc" placeholder="请填写说明" clearable></el-input>
    </el-form-item>
  </el-form>
  <DialogForm ref="dialogFormRef" @submit="handleSubmit" />
</template>

<script setup lang="ts" name="serverForm">
import { defineModel, ref, reactive } from "vue";
import { ThingModel } from "@/api/interface";
import DynamicFormItem from "./DynamicFormItem.vue";
import DialogForm from "./DialogForm.vue";
import { getComponent } from '@/api/modules/thingModel'
import RequestSelect from "@/components/RequestSelect/index.vue";
import { FormInstance } from "element-plus";
import { useRoute } from 'vue-router';

type FieldType = "inputData" | "outputData";

const modelValue = defineModel<ThingModel.Server>({
  default: {}
});

const route = useRoute();
const thingId = route.params.id
// console.log('route123', thingId);

const editDataIndex = ref<number>();
const editField = ref<FieldType>("inputData");
const formRef = ref<FormInstance>();
const dialogFormRef = ref<InstanceType<typeof DialogForm>>();

const rules = reactive({
  name: [{ required: true, message: "请输入名称" }],
  required: [{ required: true, message: "请选择是否必选服务" }],
  callType: [{ required: true, message: "请选择调用方式" }],
  identifier: [{ required: true, message: "请输入标识符" }],
  componentId:[{ required: true, message: "请选择物模型" }]
});

function handleSubmit(params?: ThingModel.Properties) {
  if (!params) return;
  if (dialogFormRef.value?.props.title === "编辑") {
    if (modelValue.value[editField.value] && editDataIndex.value) {
      modelValue.value[editField.value]!.splice(editDataIndex.value, 1, params);
    }
  } else {
    if (modelValue.value[editField.value]) {
      modelValue.value[editField.value]!.push(params);
    } else {
      modelValue.value[editField.value] = [params];
    }
  }
}

function addData(type: FieldType) {
  editField.value = type;
  dialogFormRef.value?.acceptParams({
    title: "新增",
    formData: {
      type: "int"
    }
  });
}
function editData(formData: ThingModel.Properties, index: number, fieldType: FieldType) {
  editField.value = fieldType;
  editDataIndex.value = index;
  dialogFormRef.value?.acceptParams({
    title: "编辑",
    formData: formData
  });
}
function deleteInputData(index: number) {
  modelValue.value.inputData?.splice(index, 1);
}
function deleteOutputData(index: number) {
  modelValue.value.outputData?.splice(index, 1);
}
defineExpose({
  formRef
});
</script>

<style></style>
