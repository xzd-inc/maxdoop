<template>
  <el-dialog v-model="dialogVisible" title="证书" :destroy-on-close="true" width="800px" draggable>
    <div class="content">{{ props.content }}</div>
  </el-dialog>
</template>

<script setup lang="ts" name="CertificateDialog">
import { ref } from "vue";

interface Props {
  content?: string;
}

const props = defineProps<Props>();

// dialog状态
const dialogVisible = ref(false);

function show() {
  dialogVisible.value = true;
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
  text-align: center;
}
</style>
