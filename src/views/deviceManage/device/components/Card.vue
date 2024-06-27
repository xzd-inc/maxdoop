<template>
  <div class="container card" @click="detailDialog">
    <div class="top">
      <div class="card-title">名称：{{ props.name }}</div>
      <!-- <div @click.stop="openDialog">
        <img src="@/assets/images/detail.png"/>
      </div> -->
    </div>
    <!-- <div class="card-value">
      <span class="card-value">{{ props.data ? props.data[props.dataIndex] : "--" }}</span>
      <span class="card-unit">{{ props.unit }}</span>
    </div> -->
    <!-- <div class="card-time">{{ props.data ? dayjs(+props.data.time).format(formatTime) : "--" }}</div> -->
    <div class="card-content">
      <div style="margin-bottom: 20px;">标识：{{ props.identifier}}</div>
      <div>是否异步：{{ props.callType === '1' ? '同步' : '异步' }}</div>
    </div>
  </div>
  <DetailDialog ref="detailDialogRef"/>
</template>

<script setup lang="ts" name="mycard">
import DetailDialog from './DetailDialog.vue'
import { inject, ref, watch } from "vue";
import { detailServe } from '@/api/modules/device'

const dialogRef = ref<any>();
const detailDialogRef =ref<any>();

interface Props {
  name?: string;
  dataIndex: string;
  unit?: string;
  identifier?: string;
  callType?: "0" | "1" ;
  data?: Record<string, any>;
  item: any
}

const detailDialog = () => {
  detailDialogRef.value.show(props.item.id);
}

const formatTime = inject<string>("formatTime");

const props = defineProps<Props>();

</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
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
