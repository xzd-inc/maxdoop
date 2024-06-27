<template>
  <div class="topBox">
    <div class="leftBox">
      <el-card style="height: 750px;">
        <template #header>
          <div  class="leftBox-title">
            <div class="mf-title">设备列表</div>
            <div>
              <el-button type="danger" disabled>清空订阅</el-button>
              <el-button type="primary" disabled @click="subscribe">订阅设备</el-button>
            </div>
          </div>
        </template>
        <div class="leftBox-content">
          <div class="leftBox-content-title">过滤条件</div>
          <div class="leftBox-content-switch">
            <div>已入库</div>
           <div> <el-switch v-model="finished" /></div>
          </div>
          <div class="leftBox-content-switch">
            <div>未入库</div>
           <div> <el-switch v-model="unfinish" /></div>
          </div>
          <div class="leftBox-content-switch">
            <div>黑名单</div>
           <div> <el-switch v-model="blacklist" /></div>
          </div>
          <div>
            <div style="margin-top: 20px">
              <el-radio-group v-model="tab">
                <el-radio-button label="已入库" value="finished" />
                <el-radio-button label="未入库" value="unfinish" />
                <el-radio-button label="黑名单" value="blacklist" />
              </el-radio-group>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="rightBox">
      <el-card style="height: 750px;">
        <template #header>
          <el-button type="primary" @click="connectws">连接</el-button>
          <el-button type="primary" @click="clsws">清空日志</el-button>
          <el-button type="primary" @click="stopprint">暂停打印</el-button>
        </template>
        <div class="rightBox-ws">
          <div class="rightBox-content" v-for="(item, idx) in items" :key="idx">
            {{ item }}
          </div>
        </div>
      </el-card>
    </div>
  </div>
  <Subscribe ref="openSubscribe"/>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Subscribe from './components/subscribeModel/index.vue';
import { getConsoleURL } from '@/api/modules/consol'
import dayjs from 'dayjs';

const finished = ref(false);
const unfinish =ref(false);
const blacklist = ref(false);
const tab = ref('finished')
const openSubscribe = ref();
const wsUrl = ref('');

const items = ref([] as string[])

let webSocket: WebSocket;

const subscribe = () => {
  openSubscribe.value.show()
}

const init = () => {
  items.value = []
  webSocket = new WebSocket(wsUrl.value)
  webSocket.onopen = () => {
    items.value.push(`${dayjs().format('YYYY-MM-DD HH:mm:ss')} 连接成功`)
  }
  webSocket.onmessage = (e) => {
    items.value.push(`${dayjs().format('YYYY-MM-DD HH:mm:ss')} 收到数据${e.data}`)
  }
  webSocket.onclose = (e) => {
    items.value.push(`${dayjs().format('YYYY-MM-DD HH:mm:ss')} 断开连接`)
  }
}


const connectws = () => {
  init()
}

const clsws = () => {
  items.value = []
}

const stopprint = () => {
  webSocket.close();
}

onMounted(() => {
  getConsoleURL().then(res => {
    wsUrl.value = res.data.server
  })
})

</script>

<style scoped lang="scss">
  @import "./index.scss" 
</style>