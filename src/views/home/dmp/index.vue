<template>
  <!-- <img class="home-bg" src="@/assets/images/welcome.png" alt="welcome" /> -->
  <div class="top">
    <div class="box">
      <div class="box-top">
        <div>
          <div class="box-title">产品数量</div>
          <div class="box-title-num">422</div>
        </div>
        <div>
          <img class="box-img" src="@/assets/images/productNum.png" alt="产品数量" />
        </div>
      </div>
      <div class="box-footer">
        <div class="box-footer-title-spe">
          <div class="circle-green"></div>
          <span class="box-footer-title">正常</span>
        </div>
        <div class="box-footer-num">289</div>
        <div class="box-footer-title-spe">
          <div class="circle-red"></div>
          <span class="box-footer-title">禁用</span>
        </div>
        <div class="box-footer-num">133</div>
      </div>
    </div>
    <div class="box">
      <div class="box-top">
        <div>
          <div class="box-title">设备数量</div>
          <div class="box-title-num">462</div>
        </div>
        <div>
          <img class="box-img" src="@/assets/images/deviceNum.png" alt="设备数量" />
        </div>
      </div>
      <div class="box-footer">
        <div class="box-footer-title-spe">
          <div class="circle-green"></div>
          <span class="box-footer-title">在线</span>
        </div>
        <div class="box-footer-num">9</div>
        <div class="box-footer-title-spe">
          <div class="circle-red"></div>
          <span class="box-footer-title">离线</span>
        </div>
        <div class="box-footer-num">150</div>
      </div>
    </div>
    <div class="box">
      <div class="box-top">
        <div>
          <div class="box-title">当前在线</div>
          <div class="box-title-num">9</div>
        </div>
        <div>
          <img class="box-img" src="@/assets/images/online.png" alt="当前在线" />
        </div>
      </div>
      <div class="box-footer">
        <div class="box-footer-title">昨日在线</div>
        <div class="box-footer-num">10</div>
      </div>
    </div>
    <div class="box">
      <div class="box-top">
        <div>
          <div class="box-title">今日设备消息量</div>
          <div class="box-title-num">213208</div>
        </div>
        <div>
          <img class="box-img" src="@/assets/images/message.png" alt="今日设备消息量" />
        </div>
      </div>
      <div class="box-footer">
        <div class="box-footer-title">当月设备信息量</div>
        <div class="box-footer-num">213208</div>
      </div>
    </div>
  </div>
  <div class="charts">
    <div class="datePicker">
      <el-date-picker
        v-model="value"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </div>
    <Charts />
  </div>
</template>

<script setup lang="ts">
import Charts from "./components/charts.vue";
import { ref } from "vue";
const value = ref("");
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
