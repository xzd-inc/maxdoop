<template>
  <el-dialog v-model="visible" title="添加参数" :destroy-on-close="true" width="800px" draggable>
    <PropertiesForm ref="formRef" v-model="props.formData" />
    <template #footer>
      <div>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="DialogForm">
import { ref, defineEmits, reactive } from "vue";
import PropertiesForm from "./PropertiesForm.vue";
import { ThingModel } from "@/api/interface";

interface Props {
  title: string;
  formData?: ThingModel.Properties;
}

const formRef = ref<InstanceType<typeof PropertiesForm>>();

const props = reactive<Props>({
  title: "",
  formData: {
    type: "int"
  }
});

const emit = defineEmits<{
  submit: [value?: ThingModel.Properties];
}>();

// dialog状态
const visible = ref<boolean>(false);

function handleSubmit() {
  formRef.value?.formRef?.validate(async valid => {
    if (!valid) return;
    emit("submit", props.formData);
    visible.value = false;
  });
}
function handleClose() {
  visible.value = false;
}

function acceptParams(params: Props) {
  props.title = params.title;
  if (params.formData) {
    props.formData = params.formData;
  }
  visible.value = true;
}

defineExpose({
  acceptParams,
  props
});
</script>
<style lang="scss" scoped></style>
