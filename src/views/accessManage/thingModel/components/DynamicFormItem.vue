<template>
  <div class="wrap">
    <slot>
      <div class="container" v-for="(item, key) in props.data" :key="key">
        <div class="content" @click="() => handleEdit(item, key)">{{ item.name }}</div>
        <el-button type="danger" class="ml12" :icon="Delete" @click="() => handleDelete(key)"></el-button>
      </div>
    </slot>
    <el-button @click="handleAdd" :icon="Plus">添加参数</el-button>
  </div>
</template>

<script setup lang="ts" name="eventForm">
import { Delete, Plus } from "@element-plus/icons-vue";
import { ThingModel } from "@/api/interface";

interface Props {
  data?: ThingModel.Properties[];
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
});

const emit = defineEmits<{
  edit: [value: ThingModel.Properties, index: number];
  add: [];
  delete: [index: number];
}>();

function handleEdit(item: ThingModel.Properties, key: number) {
  emit("edit", item, key);
}
function handleAdd() {
  emit("add");
}
function handleDelete(key: number) {
  emit("delete", key);
}
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
}
.container {
  display: flex;
  & + & {
    margin-top: 10px;
  }
  .content {
    flex: 1;
    width: 0;
    border-radius: var(--el-border-radius-base);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 11px;
    transition: var(--el-transition-box-shadow);
    background-image: none;
    background-color: var(--el-fill-color-blank);
    box-shadow: 0 0 0 1px var(--el-border-color) inset;
    cursor: text;
    &:hover {
      box-shadow: 0 0 0 1px var(--el-border-color-hover) inset;
    }
  }
}
</style>
