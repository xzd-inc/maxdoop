<template>
  <div id="mapContainer" style="width: auto; height: 520px;">
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AMapLoader from "@amap/amap-jsapi-loader"
// import '@/mapJs/index.js';

onMounted(() => {
  // @ts-ignore
  window._AMapSecurityConfig = {
    securityJsCode: 'ad5f4d332ca7d87046a321eb589da931',
  }
  AMapLoader.load({
    key: '657b0653c932cf55c996ae885968b7f7',
    version: '2.0',
    plugins: [
      'AMap.ToolBar', // 工具条，控制地图的缩放、平移等
      'AMap.Geolocation', // 定位，提供了获取用户当前准确位置、所在城市的方法
      'AMap.AutoComplete', // 输入提示，提供了根据关键字获得提示信息的功能
      'AMap.Geocoder', // 地理编码与逆地理编码服务，提供地址与坐标间的相互转换
    ],
  })
    .then(AMap => {
      const map = new AMap.Map('mapContainer', {
        zoom: 14, // 设置地图显示的缩放级别
        center: [113.368332, 23.348496] // 设置地图中心点坐标
      })
      // const marker = new AMap.Marker({
      //   // position: [116.39, 39.9], //位置
      // })
      // map.add(marker) //添加到地图
    })
    .catch(e => {
      console.error(e) 
    })
})
</script>
