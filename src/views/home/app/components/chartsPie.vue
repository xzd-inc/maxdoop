<template>
  <ECharts :option="option"/>
</template>

<script setup lang="ts">
  import { ECOption } from "@/components/ECharts/config";
  import ECharts from "@/components/ECharts/index.vue";

 const option: ECOption = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: '在线状态',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 25,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '状态1' },
        { value: 735, name: '状态2' },
        { value: 580, name: '状态3' }
      ]
    }
  ]
 }
</script>