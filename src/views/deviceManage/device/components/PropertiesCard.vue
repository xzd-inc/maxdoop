<template>
  <div class="container card" @click="detailDialog(item)">
    <div class="top">
      <div class="card-title">{{ props.name }}</div>
    </div>
    <div class="card-content">
      <div >标识：{{ props.identifier}}</div>
    </div>
    <div class="card-content">
      <div >值：{{ props.propertyContent}}</div>
    </div>
  </div>
  <DetailDialog ref="detailDialogRef"/>
</template>

<script setup lang="ts" name="mycard">
import DetailDialog from './PropertiesDetailDialog.vue'
import { inject, ref, watch } from "vue";

const detailDialogRef =ref<any>();

interface Props {
  name?: string;
  dataIndex: string;
  unit?: string;
  identifier?: string;
  callType?: "0" | "1" ;
  data?: Record<string, any>;
  item: any;
  propertyContent?: string;
}

const detailDialog = (row) => {
  detailDialogRef.value.show(row);
}

const props = defineProps<Props>();

</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 160px;
  border-radius: 8px;
  padding: 16px 20px;
  // font-family: DIN;
  cursor: pointer;
  p {
    margin: 0px;
  }
  .top {
    display: flex;
    justify-content: space-between
  }
  .card-time {
    font-size: 16px;
    color: var(--el-text-color-secondary);
  }
  .card-title,
  .card-unit {
    color: var(--el-text-color-regular);
    font-size: 16px;
  }
  .card-value {
    font-size: 22px;
    margin-right: 4px;
  }
}
.card-content{
  font-size: 16px;
  color: var(--el-text-color-secondary);
  margin-top: 30px;
}
</style>
