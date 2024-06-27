<template>
  <el-form ref="formRef" label-width="100px" :rules="rules" label-suffix=" :" :model="modelValue">
    <el-form-item label="名称" prop="name">
      <el-input v-model="modelValue.name" placeholder="请填写名称" clearable></el-input>
    </el-form-item>
    <el-form-item label="标识符" prop="identifier">
      <el-input v-model="modelValue.identifier" placeholder="请填写标识符" clearable></el-input>
    </el-form-item>
    <el-form-item label="数据类型" prop="type">
      <el-select v-model="modelValue.type" placeholder="请选择数据类型" clearable>
        <el-option v-for="item in dataTypeList" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <template v-if="modelValue.type === 'boolean'">
      <el-form-item label="布尔值0" prop="falseLabel">
        <el-input v-model="modelValue.falseLabel" placeholder="布尔值0" clearable></el-input>
      </el-form-item>
      <el-form-item label="布尔值1" prop="trueLabel">
        <el-input v-model="modelValue.trueLabel" placeholder="布尔值1" clearable></el-input>
      </el-form-item>
    </template>
    <template v-else-if="modelValue.type === 'enum'">
      <el-form-item label="参数">
        <DynamicFormItem @add="addEnum">
          <div class="enum-form-item">
            <div class="flex" v-for="(item, key) in modelValue.enumItem" :key="key">
              <el-input v-model="item.value" placeholder="请输入值" clearable></el-input>
              <span class="line">-</span>
              <el-input v-model="item.label" placeholder="请输入描述" clearable></el-input>
              <el-button type="danger" class="ml12" :icon="Delete" @click="deleteEnum(key)"></el-button>
            </div>
          </div>
        </DynamicFormItem>
      </el-form-item>
    </template>
    <template v-else-if="!showFields">
      <el-form-item label="取值范围" required>
        <div class="flex">
          <el-form-item class="number-input" label="" prop="min">
            <el-input-number
              class="number-input"
              v-model="modelValue!.min"
              placeholder="请输入最小值"
              :controls="false"
            ></el-input-number>
          </el-form-item>
          <span class="line">-</span>
          <el-form-item class="number-input" label="" prop="max">
            <el-input-number
              class="number-input"
              v-model="modelValue!.max"
              placeholder="请输入最大值"
              :controls="false"
            ></el-input-number>
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item label="属性单位">
        <el-input v-model="modelValue!.unit" placeholder="请填写属性单位"></el-input>
      </el-form-item>
      <el-form-item label="单位名称">
        <el-input v-model="modelValue!.unitName" placeholder="请填写单位名称"></el-input>
      </el-form-item>
      <el-form-item label="步长" prop="step">
        <el-input-number v-model="modelValue!.step" :min="1"></el-input-number>
      </el-form-item>
    </template>
    <template v-else-if="modelValue.type === 'text'">
      <el-form-item label="数据长度" prop="length">
        <el-input-number
          class="number-input"
          v-model="modelValue!.length"
          placeholder="数据长度, 最大10240"
          controls-position="right"
          :max="10240"
        ></el-input-number>
      </el-form-item>
    </template>
    <el-form-item label="必选属性" prop="required">
      <el-radio-group v-model="modelValue.required">
        <el-radio label="1">是</el-radio>
        <el-radio label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="读写类型" prop="accessMode">
      <el-radio-group v-model="modelValue.accessMode">
        <el-radio label="rw">读写</el-radio>
        <el-radio label="r">只读</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="说明" prop="desc">
      <el-input type="textarea" v-model="modelValue.desc" placeholder="请填写说明" clearable></el-input>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="properties">
import { defineModel, reactive, computed, ref } from "vue";
import { ThingModel } from "@/api/interface";
import { Delete } from "@element-plus/icons-vue";
import { FormInstance } from "element-plus";
import { dataTypeList } from "@/utils/dict";
import DynamicFormItem from "./DynamicFormItem.vue";

const modelValue = defineModel<ThingModel.Properties>({
  default: {}
});

const formRef = ref<FormInstance>();
const rules = reactive({
  name: [{ required: true, message: "请输入名称" }],
  identifier: [{ required: true, message: "请输入标识符" }],
  accessMode: [{ required: true, message: "请选择读写模式" }],
  required: [{ required: true, message: "请选择是否必选属性" }],
  falseLabel: [{ required: true, message: "请输入布尔值0的值" }],
  trueLabel: [{ required: true, message: "请输入布尔值1的值" }],
  min: [{ required: true, message: "请输入最小值" }],
  max: [{ required: true, message: "请输入最大值" }],
  step: [{ required: true, message: "请输入步长" }],
  length: [{ required: true, message: "请输入数据长度最大值" }],
  type: [{ required: true, message: "请选择数据类型" }]
});

const excludeDataType: DataType[] = ["array", "object", "date", "text"];

function addEnum() {
  if (modelValue.value.enumItem) {
    modelValue.value.enumItem.push({ label: "", value: "" });
  } else {
    modelValue.value.enumItem = [{ label: "", value: "" }];
  }
}
function deleteEnum(index: any) {
  if (modelValue.value.enumItem) {
    modelValue.value.enumItem.splice(index, 1);
  }
}

// function formatter(value: string) {
//   return value.replace(/[^0-9.\-]/g, "");
// }
const showFields = computed(() => {
  return excludeDataType.some(item => item === modelValue.value.type);
});
defineExpose({
  formRef
});
</script>
<style scoped lang="scss">
.flex {
  display: flex;
  width: 100%;
  .line {
    padding: 0 20px;
  }
}
.enum-form-item {
  width: 100%;
  .flex {
    & + .flex {
      margin-top: 10px;
    }
  }
}
.number-input {
  width: 100%;
  text-align: left;
  :deep(.el-input__inner) {
    text-align: left;
  }
}
</style>
