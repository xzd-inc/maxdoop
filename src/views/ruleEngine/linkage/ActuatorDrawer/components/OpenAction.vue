<template>
  <div v-for="(item, idx) in branchActionTrue" :key="idx">
    <el-form-item label="执行关系">
      <div style="display: flex;width: 100%;">
        <el-select v-model="item.type" placeholder="选择执行关系">
          <el-option v-for="item in relation" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-icon
          v-if="branchActionTrue?.length"
          @click="delBranchActionTrue(idx)"
          class="del-item"
        >
          <Delete />
        </el-icon>
      </div>
    </el-form-item>

    <div class="parallel">
      <div v-for="(action, idx) in item.actions" class="parallel-list" :key="idx">
        {{ getActionsLabels(action) }}

        <el-icon @click="delAction(item.actions, idx)" class="del-item">
          <Delete />
        </el-icon>
      </div>

      <el-button @click="openAction(item.actions)" class="add-action">
        + 添加动作
      </el-button>
    </div>
  </div>

  <el-button
    @click="addBranchActionTrue"
    class="add-relation-button"
  >
    + 添加执行关系
  </el-button>

  <ActionModal ref="actionModalRef" />
</template>

<script setup lang="ts">
import { ref, defineModel } from 'vue';
import ActionModal from './ActionModal.vue';

const branchActionTrue = defineModel<IBranchActionTrue>()

const delAction = (actions: Record<string, any>[], idx: number) => {
  actions.splice(idx, 1)
}

const addBranchActionTrue = () => {
  branchActionTrue.value?.push({
    type: '',
    actions: [],
  })
}

const delBranchActionTrue = (idx) => {
  branchActionTrue.value?.splice(idx, 1)
}

const actionModalRef = ref<InstanceType<typeof ActionModal>>()
const openAction = (actions) => {
  function cb(action) {
    actions.push(action)
  }

  actionModalRef.value?.open(cb)
}

type IBranchActionTrue = {
  type: string
  actions: object[]
}[]

const relation = [
  { value: '1', label: '并行' },
  { value: '2', label: '串行' }
]

const getActionsLabels = (action: Record<string, any>) => {
  const arr: string[] = []

  if (action.executor_content) {
    arr.push(`执行内容 ${action.executor_content.label};`)
  }
  if (action.product) {
    arr.push(`执行对象 ${action.product.label}`)
  }
  if (action.executor_target?.length) {
    arr.push(`执行设备 ${action.executor_target?.map(v => v.label).join('、')};`)
  }
  if (action.function_id) {
    arr.push(`执行动作 ${action.function_id.label};`)
  }
  if (action.inputData?.length) {
    arr.push(`温度设置 ${action.inputData[0].value}`)
  }
  return arr.join(' ')
}
</script>

<style scoped>
.parallel {
  margin: 5px 60px;
  width: 84%;
}

.parallel-list {
  margin: 10px 0;
  padding: 4px 12px;
  font-size: 14px;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  display: flex;
}

.inputAdd {
  margin: 5px 60px;
  width: 84%
}

.add-action {
  width: 100%;
}
.del-item {
  cursor: pointer;
  color: red;
}
.add-relation-button {
  width: 100%;
}
</style>