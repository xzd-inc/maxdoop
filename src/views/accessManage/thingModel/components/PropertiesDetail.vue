<template>
 <el-dialog v-model="isVisible" width="600" title="属性详情" class="service-dialog">
  <div style="margin-left: 50px;">
    <div class="service-item">
        <span class="label">名称：</span>
        {{ detail?.name }}
      </div>
      <div class="service-item">
        <span class="label">标识：</span>
        {{ detail?.identifier }}
      </div>
      <div class="service-item">
        <span class="label">数据类型：</span>
        {{ detail?.type }}
      </div>
      <div class="service-item">
        <span class="label">数据范围：</span>
        {{ detail?.min }} ~{{ detail?.max }}
      </div>
      <div class="service-item">
        <span class="label">单位：</span>
        {{ detail?.unitName }}
      </div>
      <div class="service-item">
        <span class="label">步长：</span>
        {{ detail?.step }}
      </div>
      <div class="service-item">
        <span class="label">读写类型：</span>
        {{ detail?.accessMode === 'r' ? '只读' : '读写' }}
      </div>
      <div class="service-item">
        <span class="label">必选属性：</span>
        {{ detail?.required === '1' ? '必选' : '非必选' }}
      </div>
      <div class="service-item">
        <span class="label">说明：</span>
        {{ detail?.remark }}
      </div>
  </div>
 </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const isVisible = ref(false);
const detail = ref();

defineExpose({
  show(row) {
    detail.value = row;
    isVisible.value = true;
  }
})
</script>

<style lang="scss">
.service-dialog {
  .service-item {
    margin: 15px 0;
  }
  .label {
    color: #606266;
    font-size: 14px;
    display: inline-block;
    width: 90px;
    text-align: right;
    margin-right: 20px
  }
}
</style>