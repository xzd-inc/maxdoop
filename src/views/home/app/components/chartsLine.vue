<template>
  <ECharts :option="option"/>
</template>

<script setup lang="ts">
import { ECOption } from "@/components/ECharts/config";
import ECharts from "@/components/ECharts/index.vue";

const option: ECOption = {
  color: ['#80FFA5', '#00DDFF', '#37A2FF'],
  title: {
    text: '健康状态统计',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    } 
  },
  legend: {
    data: ['类型 1', '类型 2', '类型 3',]
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['04/01', '04/02', '04/03', '04/04', '04/05', '04/06', '04/07','04/08', '04/09', '04/10']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '类型 1',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //   {
        //     offset: 0,
        //     color: 'rgb(128, 255, 165)'
        //   },
        //   {
        //     offset: 1,
        //     color: 'rgb(1, 191, 236)'
        //   }
        // ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [140, 232, 101, 264, 90, 340, 250, 220, 180, 130]
    },
    {
      name: '类型 2',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //   {
        //     offset: 0,
        //     color: 'rgb(0, 221, 255)'
        //   },
        //   {
        //     offset: 1,
        //     color: 'rgb(77, 119, 255)'
        //   }
        // ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [120, 282, 111, 234, 220, 340, 310, 264, 90, 340,]
    },
    {
      name: '类型 3',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //   {
        //     offset: 0,
        //     color: 'rgb(55, 162, 255)'
        //   },
        //   {
        //     offset: 1,
        //     color: 'rgb(116, 21, 219)'
        //   }
        // ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [320, 132, 201, 334, 190, 130, 270,282, 111, 234]
    }
  ]
}

</script>