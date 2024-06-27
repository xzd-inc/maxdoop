<template>
  <div class="home_topBox">
    <div v-for="item in items" :label="item.title" :value="item.value" class="top_square"> {{ item.title }}
      <div class="square_num"> {{ item.num }} </div>
    </div>
  </div>
  <div class="home_centerBox">
    <div class="home_mapBox">
       <AMap />
    </div>
    <div class="history_box">
      <div class="history_title">操作历史</div>
      <div class="history_list" v-for="detail in itemList" :value="detail.value" :label="detail.label" :key="detail.key">
        <div class="history_list_time">{{ detail?.operation }}</div>
        <div class="history_list_name">{{ detail?.operationTime }}</div>
      </div>
    </div>
  </div>
  <div class="home_bottomBox">
    <div class="bottom_left">
      <Charts />
    </div>
    <div class="bottom_right">
      <div class="bottom_title">在线状态统计</div>
      <ChartsPie />
    </div>
  </div>
</template>

<script setup lang="ts">
import Charts from "./components/chartsLine.vue";
import ChartsPie from "./components/chartsPie.vue";
import AMap from "@/components/AMap/index.vue";
import { onMounted, ref } from "vue";
import { getHistoryList } from '@/api/modules/home';

const itemList = ref();
const items = [
  { value: 1, title: "设备数量", num:523},
  { value: 2, title: "在线",num:523},
  { value: 3, title: "离线",num:523},
  { value: 4, title: "异常",num:523},
  { value: 5, title: "今日使用次数",num:523},
  { value: 6, title: "今日告警次数",num:523},
]

onMounted(() => {
  getHistoryList().then(res => {
    itemList.value = res.data;
  })
})

</script>

<style scoped lang="scss">
  @import "./index.scss";
</style>