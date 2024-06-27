<template>
  <el-form ref="ruleFormRef" label-width="100px" :rules="rules" label-suffix=" :" :model="modelValue">
    <el-form-item label="调试功能" prop="dataType.type">
      <el-select v-model="modelValue.type" placeholder="请选择数据类型" clearable>
        <el-option v-for="item in dataTypeList" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item prop="roleIds">
      <el-input type="textarea" placeholder="请填写描述" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <div class="footer">
        <el-button type="primary">发送指令</el-button>
        <el-button>重置</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="properties">
import { defineModel, reactive } from "vue";
import { ThingModel } from "@/api/interface";
import { dataTypeList } from "@/utils/dict";

const modelValue = defineModel<ThingModel.Properties>({
  default: {}
});

const rules = reactive({
  name: [{ required: true, message: "请输入名称" }],
  identifier: [{ required: true, message: "请输入标识符" }],
  "dataType.type": [{ required: true, message: "请选择数据类型" }]
});
</script>

<style scoped lang="scss">
.footer {
  width: 100%;
  text-align: right;
}
</style>
