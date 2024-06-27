<template>
  <div class="datePicker">
    <el-date-picker
      v-model="times"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="YYYY-MM-DD"
    />
  </div>
  <div class="card content-box">
    <ECharts :option="option" />
  </div>
</template>

<script setup lang="ts" name="lineChart">
import ECharts from "@/components/ECharts/index.vue";
import { getLine } from '@/api/modules/home';
import { ref, watch } from "vue";
import dayjs from "dayjs";

const times = ref([
  dayjs().format('YYYY-MM-DD'),
  dayjs().format('YYYY-MM-DD')
])

watch(
  times,
  (newTimes, oldValues) => {
    getLine({ startDate: newTimes[0], endDate: newTimes[1] }).then(res => {
      const arr = res.data.map((v) => v.dateTime);
      const y1 = res.data.map(v => v.oneDay)
      const y2 = res.data.map(v => v.oneHour)
      const y3 = res.data.map(v => v.oneWeek)
      
      // x轴数据
      option.value.xAxis[0]  = arr
      option.value.series[0].data = y1
      option.value.series[1].data = y2
      option.value.series[2].data = y3
    })
},
{ immediate: true }
)

const option: any = ref(
  {
  title: {
    text: "日志统计",
    textStyle: {
      color: "black"
    }
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985"
      }
    }
  },
  legend: {
    data: ["最近1小时", "最近24小时", "近1周"],
    textStyle: {
      color: "#a1a1a1"
    }
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: [],
      axisLabel: {
        color: "#a1a1a1"
      }
    }
  ],
  yAxis: [
    {
      type: "value",
      axisLabel: {
        color: "#a1a1a1"
      }
    }
  ],
  series: [
    {
      name: "最近1小时",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series"
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: "最近24小时",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series"
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: "近1周",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series"
      },
      data: [150, 232, 201, 154, 190, 330, 410]
    }
  ]
}
)

</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
