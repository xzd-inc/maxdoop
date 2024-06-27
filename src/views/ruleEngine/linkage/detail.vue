<template>
  <el-tabs v-model="activeName" class="container" @tab-click="handleClick">
    <el-card class="el_card">
      <template #header>
        <div class="mf-title">基础信息</div>
      </template>
      <el-descriptions>
        <el-descriptions-item label="名称">{{ detail?.ruleName }}</el-descriptions-item>
        <el-descriptions-item label="触发方式">{{ ruleType.find(v => v.value === detail?.ruleType)?.label || '-'
          }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="detail?.ruleStatus === 1 ? 'success' : 'danger'">{{ filterEnum(detail?.ruleStatus, status)
            }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="说明">{{ detail?.remark }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="el_card" v-if="detail?.ruleType === '1'">
      <template #header>
        <div class="flx-justify-between">
          <span class="mf-title">触发器</span>
          <div>
            <el-button type="danger" v-if="detail?.triggerConfig?.target_id?.length > 0" @click="deleteTriggerConfig">
              删除
            </el-button>
            <el-button type="primary" @click="openTrigger" v-else>
              配置
            </el-button>
          </div>
        </div>
      </template>
      <div v-for="items in detail?.triggerConfig" :key="items.target_id">
        <el-descriptions>
          <el-descriptions-item label="触发类型">{{ triggerType.find(v => v.value === detail?.triggerType)?.label || '-'
            }}</el-descriptions-item>
            <el-descriptions-item label="说明">{{ detail?.triggerRemark }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <TriggerDrawer ref="triggerDrawerRef" />
    </el-card>
    <el-card class="el_card" v-if="detail?.ruleType === '2'">
      <template #header>
        <div class="flx-justify-between">
          <span class="mf-title">定时器</span>
          <div>
            <el-button type="danger" >删除</el-button>
            <el-button type="primary" @click="openTimer" >配置</el-button>
          </div>
        </div>
      </template>
      <div class="timerBox">
        <span>每天</span>
        <span>00:00:00 -00:00:00  </span>
        <span>每1小时执行一次</span>
      </div>
      <TimerDrawer ref="timerDrawerRef"/>
    </el-card>
    <el-card>
      <template #header>
        <div class="flx-justify-between">
          <span class="mf-title">执行器</span>
          <div>
            <el-button type="danger" @click="deleteHandExecute" v-if="detail?.ruleExecutorDtos?.length > 0">删除</el-button>
            <el-button type="primary" @click="cilckHandExecute" v-if="detail?.ruleExecutorDtos?.length > 0 && detail?.ruleType === '3'">执行</el-button>
            <el-button type="primary" @click="openActuator">配置</el-button>
          </div>
        </div>
      </template>
      <div class="actuatorBox" v-for="item in detail?.ruleExecutorDtos" :key="item.id">
        <div>执行：</div>
        <div class="actuatorBox-left">
          <div v-for="v in item.executorConfigs?.branchActionTrue" style="margin-bottom: 10px;">
            <div class="actuatorBox-desc">
              {{ v.type === '1' ? '串行' : '并行' }}
              <span class="actuatorBox-desc_span">同时执行所有动作，适用于不需要关注执行动作先后顺序和结果</span>
            </div>
            <div class="actuatorBox-list" v-for="(action, index) in v.actions" :key="index">
              动作
              <span class="actuatorBox-list-item">{{ getExecutorContent(action.executor_content) }}</span>
            </div>
          </div>

        </div>
      </div>
      <ActuatorDrawer ref="actuatorDrawerRef" />
    </el-card>
  </el-tabs>
</template>

<script setup lang="ts" name="alarmDetail">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { ruleEngine } from "@/api/interface";
import { detailRuleEngine, delHandActuator, handExecute, getFunctionDetail, getActuator, deleteTrigger } from '@/api/modules/ruleEngine';
import { ruleType, status, triggerType } from '@/utils/dict';
import { filterEnum } from "@/utils";
import TriggerDrawer from './TriggerDrawer.vue';
import TimerDrawer from './TimerDrawer.vue';
// import ActuatorDrawer from './ActuatorDrawer.vue'
import ActuatorDrawer from './ActuatorDrawer1/index.vue'
import { ElMessage } from "element-plus";

const route = useRoute();
const detail = ref<any>();
const activeName = ref("first");

function handleClick(e) {
  console.log(e);
}

const getExecutorContent = (executor_content) => {
  if (executor_content === 'deviceOutputNode') {
    return '设备输入';
  }
}

const triggerDrawerRef = ref({} as InstanceType<typeof TriggerDrawer>)
const openTrigger = (row?: ruleEngine.linkage) => {
  const params = {
    title: "编辑",
    row: { ...row },
    refresh: getDetail,
  };
  triggerDrawerRef.value?.openTrigger(params)
}

const deleteTriggerConfig = async() => {
  return deleteTrigger({ id: route.params.id }).then(() => {
    ElMessage.success('删除成功')
    getDetail()
  })
}

const timerDrawerRef = ref({} as InstanceType<typeof TimerDrawer>)
const openTimer = (row?: ruleEngine.Timer) => {
  const params = {
    title: "编辑",
    row: { ...row }
  };
  timerDrawerRef.value?.openTimer(params);
}

const actuatorDrawerRef = ref({} as InstanceType<typeof ActuatorDrawer>)
const openActuator = () => {
  actuatorDrawerRef.value?.openActuator();
}

async function getDetail() {
  // @ts-expect-error
  const { data } = await detailRuleEngine({ id: route.params.id });

  detail.value = data;

  console.log('detail',detail);
  
}

// 执行
const cilckHandExecute = async () => {
  return handExecute({ id: route.params.id })
    .then(() => {
      ElMessage.success('执行成功')
      getDetail();
    })
    .catch(err => {
      ElMessage.error('执行失败')
    })
}

const deleteHandExecute = async () => {
  // ruleExecutorId
  return delHandActuator({ id: route.params.id })
    .then(() => {
      ElMessage.success('删除成功')
      getDetail();
    })
    .catch(err => {
      ElMessage.error('删除失败')
    })
}


onMounted(() => {
  getDetail();

  getFunctionDetail({ functionId: '1792371474641072130' })
    .then(res => {
      console.log(111, res)
    })
})

</script>

<style lang="scss" scoped>
@import "@/styles/element.scss";

.el_card {
  margin-bottom: 10px;
}

.timerBox {
  text-align: center;
  width: 20%;
  margin: 5px;
  padding: 10px 10px;
  background-color: #F5F7FA;
  color: #999999;
}

.actuatorBox {
  display: flex;
  padding: 10px 10px;
}

.actuatorBox-left {
  width: 90%;
}

.actuatorBox-desc {
  background-color: #F5F7FA;
  border: 1px solid #F5F7FA;
  padding: 5px 10px
}

.actuatorBox-desc_span {
  margin-left: 10px;
  color: #999999;
  font-size: 15px;
}

.actuatorBox-list {
  padding: 5px 15px;
  margin: 5px 0;
  width: 20%;
  color: #999999;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
}

.actuatorBox-list-item {
  color: #303133;
  font-size: 15px;
  margin: 0 2px;
}
</style>