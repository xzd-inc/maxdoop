<template>
  <el-dialog v-model="dialogVisible" title="" :destroy-on-close="true" width="300px" draggable>
    <img :src="src" width=250>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getUserCode } from "@/api/modules/user";
import { useRoute } from 'vue-router';

const dialogVisible = ref(false);
const route = useRoute();
const src = ref();

async function show() {
  dialogVisible.value = true;
  const res  = await getUserCode({ scene: route.params.id })
  src.value = 'data:image/png;base64,'+ res.data;
  console.log('detail22222',res);
}

defineExpose({
  show
});
</script>

<style scoped>
</style>