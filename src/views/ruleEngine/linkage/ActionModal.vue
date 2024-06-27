<template>
  <el-dialog
    v-model="dialogVisible"
    title="添加动作"
    width="550"
  >
    <el-form ref="formRef" label-width="100px" style="margin-top: 10px;" :model="form" :rules="rules">
      <el-form-item label="执行内容" prop="executor_content">
        <el-select v-model="form.executor_content" palceholder="请选择执行内容">
          <el-option v-for="item in operateContentItems" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>

      <div v-if="form.executor_content === 'deviceOutputNode'" style="display: flex;">
        <el-form-item label="执行对象" prop="product">
          <el-select v-model="form.product" palceholder="请选择执行对象" style="width: 210px;">
            <el-option v-for="item in productList" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="executor_target" label-width="0">
          <el-select v-model="form.executor_target" palceholder="请选择执行设备" style="width: 210px;" multiple>
            <el-option v-for="item in deviceList" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
      </div>
      <div v-if="form.executor_content=== 'deviceOutputNode'">
        <el-form-item label="执行动作" prop="function_id" >
          <el-select v-model="form.function_id" palceholder="请选择执行动作">
            <el-option v-for="item in actionList" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <div class="action_Box" v-if="form.function_id">
          <el-table
            :data="inputData"
            :header-row-style="{ '--el-table-header-bg-color': '#F5F7FA' }"
          >
            <el-table-column prop="name" label="属性" />
            <el-table-column label="值" width="250">
              <template #default="scope">
                <el-input-number
                  style="width: 100%;"
                  v-model="scope.row.value"
                  :min="+scope.row.min"
                  :max="+scope.row.max"
                  :controls="false"
                  :placeholder="`请输入${+scope.row.min}到${+scope.row.max}范围的值`"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div v-if="form.function_id === 'function'" class="action_Box">
          <div class="action_function">
            <span class="action_functionTitle">功能</span>
          </div>
          <div class="action_functionOption">
            <el-checkbox v-model="checked1" label="功能 1" />
            <el-checkbox v-model="checked2" label="功能 2" />
            <el-checkbox v-model="checked3" label="功能 2" />
          </div>
        </div>

        <div v-if="form.function_id === 'valueRead'" class="action_Box">
          <div class="action_function">
            <span class="action_functionTitle">属性</span>
          </div>
          <div class="action_functionOption">
            <el-checkbox v-model="checked1" label="属性 1" />
            <el-checkbox v-model="checked2" label="属性 2" />
            <el-checkbox v-model="checked3" label="属性 2" />
          </div>
        </div>
        
        <div v-if="form.function_id === 'valueSet'" class="action_Box">
          <el-table :data="valueSetTableData" :header-row-style="{ '--el-table-header-bg-color': '#F5F7FA' }">
            <el-table-column prop="attribute" label="属性" />
            <el-table-column prop="value" label="值">
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div v-if="form.executor_content=== '2'"  class="action_Box">
          <el-table :data="triggerAlarmTableData" :header-row-style="{ '--el-table-header-bg-color': '#F5F7FA' }">
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="type" label="类型" />
            <el-table-column prop="level" label="级别" />
          </el-table>
      </div>

      <div v-if="form.executor_content=== '3'">
        <div class="action_Box">
          <el-table :data="tableData" :header-row-style="{ '--el-table-header-bg-color': '#F5F7FA' }" >
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="way" label="方式" />
            <el-table-column prop="type" label="类型" />
          </el-table>
        </div>
          <el-form-item label="接收人" prop="people" >
          <el-select v-model="form.function_id" palceholder="请选择接收人">
            <el-option v-for="item in actionItems" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineExpose, reactive, onMounted, watch } from 'vue';
import { getProduct, getAdvice, getServe } from '@/api/modules/ruleEngine'

const dialogVisible = ref(false);
const cbRef = ref<Function>()

const rules = reactive({
  executor_content: [{ required: true, message: "请选择执行内容" }],
  product: [{ required: true, message: "请选择对象" }],
  executor_target: [{ required: true, message: "请选择设备" }],
  function_id: [{ required: true, message: "请选择动作" }]
})

const form = reactive({
  executor_content: '',
  product: '',
  executor_target: [] as any[],
  function_id: ''
})

const operateContentItems = [
  { value: 'deviceOutputNode', label: '设备输入' },
  { value: 'alarmNode', label: '触发告警' },
  { value: 'notifyNode', label: '消息通知' }
]

const productList = ref<any[]>([])
const deviceList = ref<any[]>([])
const actionList = ref<any[]>([])

const inputData = ref<any[]>([])

watch(
  () => form.product,
  (newProduct) => {
    form.executor_target = []
    form.function_id = ''

    getAdvice(newProduct).then(res => {
      deviceList.value = res.data.map(v => ({ ...v, label: v.deviceName, value: v.id }))
    })
    getServe(newProduct).then(res => {
      actionList.value = res.data.map(v => ({ ...v, label: v.name, value: v.id }))
    })
  }
)

watch(
  () => form.function_id,
  (newAction) => {
    inputData.value = actionList.value.find(v => v.id === newAction)?.inputData || []
  }
)

onMounted(() => {
  // 获取执行对象
  getProduct().then(res => {
    productList.value = res.data.map(v => ({ ...v, label: v.name, value: v.id }))
  })
})

defineExpose({
  open(cb) {
    formRef.value?.resetFields()

    dialogVisible.value = true
    cbRef.value = cb
  }
})

const formRef = ref()

function confirm() {
  const keyMap = {
    executor_content: operateContentItems,
    product: productList.value,
    executor_target: deviceList.value,
    function_id: actionList.value,
  }

  formRef.value.validate((validated) => {
    if (validated) {
      const obj: any = {}
      for (let key in form) {
        let item
        if (key === 'executor_target') {
          item = keyMap.executor_target.filter(v => form.executor_target.includes(v.value))
        } else {
          item = keyMap[key].find(v => v.value === form[key])
        }

        obj[key] = item

      }

      obj.inputData = inputData.value

      cbRef.value?.(obj)
      dialogVisible.value = false
    }
  })
}

const checked1 = ref(false);
const checked2 = ref(false);
const checked3 = ref(false);

const actionItems =[
  { value: 'function', label: '功能调用' },
  { value: 'valueRead', label: '属性读取' },
  { value: 'valueSet', label: '属性设置' }
]

const tableData = [
  {
    name: '通知1',
    way: '方式1',
    type: '类型1',
  },
  {
    name: '通知2',
    way: '方式2',
    type: '类型2',
  },
  {
    name: '通知3',
    way: '方式3',
    type: '类型3',
  },
]

const triggerAlarmTableData = [
  {
    name: '告警1',
    type: '类型1',
    level: '级别1',
  },
  {
    name: '告警2',
    type: '类型2',
    level: '级别2',
  },
  {
    name: '告警3',
    type: '类型3',
    level: '级别3',
  },
]

const valueSetTableData = [
  {
    name: '属性1',
  },
]

</script>

<style lang="scss" scoped>
  .action_Box {
    margin-left:100px;

  }
  .action_function{
    background-color: #F5F7FA;
    color: #333333;
    font-weight: 600;
    padding: 5px;
    justify-content: space-around;
  }
  .action_functionTitle {
    margin-left: 70px;
  }
  .action_functionOption {
    display: grid;
  }
  .action_functionTitle_set {
    text-align: center;
    display: inline-block;
    // width: 30%;
  }
  .action_functionOption_set {
    display: flex;
    justify-content: space-around;
  }
</style>
