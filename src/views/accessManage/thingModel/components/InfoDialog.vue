<template>
  <el-dialog v-model="dialogVisible" title="物模型" :destroy-on-close="true" width="800px" draggable>
    <div class="content">{{ detail?.modelBodyStr }}</div>
  </el-dialog>
</template>

<script setup lang="ts" name="InfoDialog">
import { ref, nextTick } from "vue";
import { useRoute } from "vue-router";
import { getThingModelDetailApi } from "@/api/modules/thingModel";
import { ThingModel } from "@/api/interface";

const route = useRoute();
const detail = ref<ThingModel.Response>();

// dialog状态
const dialogVisible = ref(false);

function show() {
  dialogVisible.value = true;
  nextTick(async () => {
    const { data } = await getThingModelDetailApi({ id: route.params.id as string });
    detail.value = data;
  });
}

defineExpose({
  show
});
</script>
<style lang="scss" scoped>
.content {
  height: 560px;
  overflow: auto;
  white-space: pre;
}
</style>
