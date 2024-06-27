<template>
  <el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :model="modelValue">
    <el-form-item v-for="item in properties" :key="item.id" :label="item.name">
      <div class="form-item">
        <el-input class="form-item-i" v-model="modelValue.name" clearable></el-input>
        <el-dropdown trigger="click" @command="handleSubmit">
          <el-button type="primary">
            调试
            <el-icon class="ml2"><ArrowDown /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="fetch">获取</el-dropdown-item>
              <el-dropdown-item command="set">设置</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-form-item>
    <!-- <el-form-item label="温度">
      <el-input v-model="modelValue.identifier" placeholder="请填写标识符" clearable></el-input>
    </el-form-item>
    <el-form-item label="湿度">
      <el-select v-model="modelValue.type" placeholder="请选择数据类型" clearable>
        <el-option v-for="item in dataTypeList" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item> -->
    <el-form-item>
      <div class="footer">
        <el-button type="primary">获取</el-button>
        <el-button>设置</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="properties">
import { defineModel, onMounted, ref } from "vue";
import { ThingModel } from "@/api/interface";
// import { dataTypeList } from "@/utils/dict";
import { getThingModelPropsNopage } from "@/api/modules/thingModel";

const modelValue = defineModel<ThingModel.Properties>({
  default: {
    dataType: {
      type: "",
      specs: {}
    }
  }
});
const properties = ref<ThingModel.Properties[]>();

async function getThingModelProps() {
  const { data } = await getThingModelPropsNopage({ modelId: "1767001449419005953" });
  properties.value = data;
}

function handleSubmit(e) {
  console.log("e=", e);
}
onMounted(() => {
  getThingModelProps();
});
</script>

<style scoped lang="scss">
.form-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  .form-item-i {
    flex: 1;
    margin-right: 2px;
  }
}
.footer {
  width: 100%;
  text-align: right;
}
</style>
