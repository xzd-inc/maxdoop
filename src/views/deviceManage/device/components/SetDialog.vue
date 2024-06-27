<template>
  <el-dialog v-model="dialogVisible" width="800" title="调试">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto" status-icon>
      <el-form-item label="调试服务" prop="service">
        <el-select v-model="ruleForm.service">
          <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="ruleForm.service"
        v-for="item in detail?.inputData"
        :label="item.name"
        :prop="item.identifier"
        :key="item.identifier"
      >
        <el-input-number
          style="width: 300px; margin: 0 10px;"
          v-model="item.value"
          :controls="false"
          :min="item?.min"
          :max="item?.max"
        />
        {{ item?.unit }}
      </el-form-item>
      <el-form-item label="输出" prop="output">
        <div class="output-area">
          <div v-if="resp?.data" v-for="item in resp?.data">
            {{ item.functionContent }}：{{ item.functionKey }}
          </div>
          <div v-if="resp?.code === 200">
            接收成功
          </div>
          <div class="error" v-if="resp?.code && resp.code !== 200">
            接收失败
          </div>
        </div>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="test">
          调试
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineExpose, reactive, computed, watch } from 'vue';
import { getDebugParamsResult, getDeviceServices, detailServe } from '@/api/modules/device';
import { useRoute } from 'vue-router';
import type { FormInstance } from 'element-plus'

const route = useRoute()

const rules = reactive({
  service: [
    { required: true, message: '必选', trigger: 'blur' },
  ],
})
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  service: '',
  value: NaN
})

const dialogVisible = ref(false);
const functionIdRef = ref()
const resp = ref()
const detail = ref<any>()

const list = ref([] as any[])

const test = () => {
  const inputParams: any = {}

  detail.value?.inputData?.forEach(v => {
    inputParams[v.identifier] = v.value
  })

  return getDebugParamsResult({ function: functionIdRef.value, ...inputParams })
    .then(res => {
      resp.value = res
    })
}

watch(
  () => ruleForm.service,
  (functionId) => {
    detailServe({ functionId })
      .then(res => {
        detail.value = res.data
      })
  }
)

defineExpose({
  show() {
    getDeviceServices({ deviceId: route.params.id })
      .then(res => {
        list.value = res?.data
      })

    dialogVisible.value = true;
  }
})
</script>

<style lang="scss" scoped>
.title {
  font-size: 14px;
  // margin-bottom: 10px;
}

.input-title {
  margin-top: 10px;

  &::before {
    content: "*";
    color: var(--el-color-danger);
    position: absolute;
    left: 3px;
  }
}

.input-area {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.error {
  color: #F56C6C;
}

.output-area {
  border-radius: 6px;
  border: 1px solid #CCCCCC;
  width: 95%;
  height: 120px;
  line-height: 30px;
  padding: 10px 15px;
  margin-top: 10px;
}
</style>