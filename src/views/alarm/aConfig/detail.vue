<template>
  <el-tabs v-model="activeName" class="container" @tab-click="handleClick">
      <el-card>
        <template #header>
          <div class="mf-title">基础信息</div>
        </template>
        <el-descriptions>
          <el-descriptions-item label="名称">{{ detail?.alarmName }}</el-descriptions-item>
          <el-descriptions-item label="类别">{{ alarmType.find(v => v.value === detail?.alarmType)?.label || '-' }}</el-descriptions-item>
          <el-descriptions-item label="级别">{{  alarmLevel.find(v => v.value === detail?.alarmLevel)?.label || '-' }}</el-descriptions-item>
          <el-descriptions-item label="说明">{{ detail?.remark }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
  </el-tabs>
</template>

<script setup lang="ts" name="alarmDetail">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { detailAlarmParams } from '@/api/modules/alarm';
import { Alarm } from "@/api/interface";
import { alarmType, alarmLevel } from '@/utils/dict';
import { filterEnum } from "@/utils";



const detail = ref<Alarm.AlarmParams>();
const route = useRoute();
const activeName = ref("first");
function handleClick(e) {
  console.log(e);
}
async function getDetail() {
  const { data } = await detailAlarmParams({ id: route.params.id });
  detail.value = data;
}

onMounted(() => {
  getDetail();
})

</script>

<style lang="scss" scoped>
@import "@/styles/element.scss";

.container {
  height: 100%;
  :deep(.el-tabs__header) {
    @include card;
    padding: 0 20px;
    margin-bottom: 10px;
    .el-tabs__nav-wrap::after {
      height: 0;
    }
  }
}
.box-card {
  margin-top: 10px;
}
.table {
  :deep(.el-card__body) {
    height: calc(100vh - 450px);
  }
}
</style>
