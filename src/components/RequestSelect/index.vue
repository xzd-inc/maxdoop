<template>
  <el-select ref="SelectRef" v-model="value" v-bind="$attrs" @visible-change="(visible) => visible && getData()">
    <el-option v-for="item in options" :key="item[props.id]" :label="item[props.label]" :value="item[props.id]" />
  </el-select>
</template>

<script setup lang="ts" name="RequestSelect">
import { ref, watch, onMounted } from "vue";
import { ElSelect } from "element-plus";

// 接收父组件参数并设置默认值
interface RequestSelectProps {
  api?: (data?: any) => Promise<any>; // 请求分类数据的 api ==> 非必传
  data?: { [key: string]: any }[]; // 分类数据，如果有分类数据，则不会执行 api 请求 ==> 非必传
  id?: string; // 选择的id ==> 非必传，默认为 “id”
  label?: string; // 显示的label ==> 非必传，默认为 “label”
}
const props = withDefaults(defineProps<RequestSelectProps>(), {
  id: "id",
  label: "label"
});

const value = defineModel<string | number | Array<string | number>>();

const SelectRef = ref<InstanceType<typeof ElSelect>>();
const options = ref<{ [key: string]: any }[]>([]);

async function getData() {
  if (props.api) {
    const { data } = await props.api!();
    options.value = data;
  }
}

onMounted(getData);

watch(
  () => props.data,
  () => {
    if (props.data?.length) {
      options.value = props.data;
    }
  },
  { deep: true, immediate: true }
);

// 暴露给父组件使用
defineExpose({ options, SelectRef });
</script>

<style scoped lang="scss"></style>
