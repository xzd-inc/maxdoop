<template>
  <!-- <img class="home-bg" src="@/assets/images/welcome.png" alt="welcome" /> -->
  <div class="top">
    <div class="box">
      <div class="box-top">
        <div>
          <div class="box-title">日志总数</div>
          <div class="box-title-num">{{ resp?.logSum || '--'}}</div>
        </div>
        <div>
          <img class="box-img" src="@/assets/images/log.png" alt="日志总数" />
        </div>
      </div>
      <div class="box-footer">
        <div>
          <span class="footer-title">操作：</span>
          <span class="footer-numb">{{ resp?.logOperationNum || '--'}}</span>
        </div>
        <div>
          <span class="footer-title">登录:</span>
          <span class="footer-numb">{{ resp?.logInNum || '--'}}</span>
        </div>
        <div>
          <span class="footer-title">异常:</span>
          <span class="footer-numb">{{ resp?.logErrorNum || '--'}}</span>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="box-top">
        <div>
          <div class="box-title">告警总数</div>
          <div class="box-title-num">{{ resAlarm?.alarmSumNum || '--' }}</div>
        </div>
        <div>
          <img class="box-img" src="@/assets/images/alarm.png" alt="告警总数" />
        </div>
      </div>
      <div class="box-footer">
        <div class="box-footer-title">昨日告警数</div>
        <div class="box-footer-num">{{ resAlarm?.yesterDayAlarmNum || '--' }}</div>
      </div>
    </div>
    <div class="box">
      <div class="box-top">
        <div>
          <div class="box-title">通知总数</div>
          <div class="box-title-num">{{ resNotify?.notifySumNum || '--'}}</div>
        </div>
        <div>
          <img class="box-img" src="@/assets/images/info.png" alt="通知总数" />
        </div>
      </div>
      <div class="box-footer">
        <div class="box-footer-title">昨日通知数</div>
        <div class="box-footer-num">{{ resNotify?.yeaterdayNotifyNum || '--'}}</div>
      </div>
    </div>
    <div class="box">
      <div class="box-top">
        <div>
          <div class="box-title">可操作项目</div>
          <div class="box-title-num">{{ resop?.retrieveOperationalProjectCount }}</div>
        </div>
        <div>
          <img class="box-img" src="@/assets/images/operatable.png" alt="可操作项目" />
        </div>
      </div>
      <div class="footer-operate">
        <!-- <el-cascader :modelValue="projectValue" :options="operatableList" @change="handleChange" style="width: 320px;"/> -->
        <div class="header-center" v-if="env === '运维中心'">当前项目：{{ store?.project?.projectName }}</div>
      </div>
    </div>
  </div>
  <div class="charts">
    <Charts />
  </div>
</template>

<script setup lang="ts">
import Charts from "./components/charts.vue";
import { getOperatableList, editOperatable } from "@/api/modules/menu";
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import useCurrentProject from '@/stores/modules/currentProject';
import { getAlarmCount, getLogCount, getInfoCount, retrieveOperationalProjectCount} from '@/api/modules/home';
import currentProject from '@/stores/modules/currentProject';

const store = currentProject()

const env = localStorage.getItem("env")

const { setProject, projectValue, setProjectValue } = useCurrentProject()

const operatableList = reactive<Array<any>>([])

const resAlarm = ref();
const resp = ref();
const resNotify = ref();
const resop = ref();

onMounted(() => {
  getOperatableList().then(res => {
    const list = res.data.map(v => {
    return {
      label: v.typeName,
      value: v.type,
      children: v.children?.map(c => {
        return {
          label: c.projectName,
          value: c.projectId,
        }
      })
    }
  })
  operatableList.push(...list)
  })

  getAlarmCount().then(res => {
    resAlarm.value = res?.data
  })
  getLogCount().then(res => {
    resp.value = res?.data
  })
  getInfoCount().then(res => {
    resNotify.value = res?.data
  })
  retrieveOperationalProjectCount().then(res => {
    resop.value = res?.data
  })
});

const handleChange = (value) => {
  setProjectValue(value)
  editOperatable(value[1])
    .then(res => {
      ElMessage.success("操作成功！")
      setProject(res.data)
    }).catch(err => {
      console.log(err);
    })
}

</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
