<template>
  <div class="container">
    <div class="leftBox">
      <el-card class="left-card">
        <template #header>
          <div class="flx-justify-between">
            <span class="mf-title">监控画面</span>
          </div>
        </template>
        <div class="videoContainer">
          <Video :url="videoUrl" ></Video>
          <div class="iconList">
            <div class="iconItemF">
              <img class="imgItems" src="@/assets/images/icon_短焦距.png"/>
              <div>短焦距</div>
            </div>
            <div class="iconItem">
              <img class="imgItems" src="@/assets/images/icon_长焦距.png"/>
              <div>长焦距</div>
            </div>
            <div class="iconItem">
              <img class="imgItems" src="@/assets/images/方向.png"/>
            </div>
            <div class="iconItem">
              <img class="imgItems" src="@/assets/images/icon_聚焦前移.png"/>
              <div>聚焦前移</div>
            </div>
            <div class="iconItem">
              <img class="imgItems" src="@/assets/images/icon_聚焦后移.png"/>
              <div>聚焦后移</div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="rightBox">
      <el-card class="right-card">
        <template #header>
          <div class="flx-justify-between">
            <span class="mf-title">基础信息</span>
          </div>
        </template>
        <div class="right-list">
          <el-descriptions :column="1" direction="right">
            <el-descriptions-item  label="序列号">{{ detail?.deviceSerial }}</el-descriptions-item>
            <el-descriptions-item label="设备名称">{{ detail?.cameraName }}</el-descriptions-item>
            <el-descriptions-item label="通道号"></el-descriptions-item>
            <el-descriptions-item label="厂家"></el-descriptions-item>
            <el-descriptions-item label="型号"></el-descriptions-item>
            <el-descriptions-item label="点位"></el-descriptions-item>
            <el-descriptions-item label="状态">{{ detail?.status === '0' ? '离线':'在线' }}</el-descriptions-item>
            <el-descriptions-item label="云台"></el-descriptions-item>
            <el-descriptions-item label="设备类型">{{ detail?.deviceType }}</el-descriptions-item>
            <el-descriptions-item label="设备用途"></el-descriptions-item>
            <el-descriptions-item label="服务用途">{{ deviceUser[detail?.deviceUser]}}</el-descriptions-item>
            <el-descriptions-item label="服务IP"></el-descriptions-item>
            <el-descriptions-item label="安装时间">{{ detail?.createTime }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted,ref } from 'vue';
import { useRoute } from 'vue-router';
import { getCameraDetail, getgetPlayUrl } from '@/api/modules/monitor';
import Video from '@/components/Video/index.vue';

const route = useRoute()
const detail = ref()
const videoUrl = ref()
const deviceUser ={
  1: '监控',
  2: '一键呼叫',
  3: '人脸识别',
  4: '车牌识别',
  5: '人流监控',
}

console.log(route.params)

onMounted(() => {
  getCameraDetail({ id: route.params.id }).then(res => {
    detail.value = res.data;
  })
  getgetPlayUrl({ id:route.params.id }).then(res =>{
    videoUrl.value = res.data.data.url
    console.log(' res.data.data', res.data.data);

  })
})

</script>

<style scoped lang="scss">
.videoContainer{
  // width: 800px;
  // height: 400px;
}
.iconList{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 80px 0;
  div + div {
    margin: 0 40px;
  }
}
.imgItems{
  cursor: pointer
}
.iconItemF{
  margin-right: 40px;
}
.iconItem{
  text-align: center;
}

.container {
  display: flex;
  width: 100%;
}

.leftBox {
  width: 60%;
  margin-right: 10px;
}
.left-card{
  height: 770px;
}
.rightBox {
  width: 40%;
}
.right-card{
  height: 770px;
}
.right-list{
  color: #606266;
  color: red;
  margin-left: 30px;
}
::v-deep .el-descriptions__cell {
  padding-bottom: 20px !important
}
</style>