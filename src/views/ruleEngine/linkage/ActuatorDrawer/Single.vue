<template>
  <div>
    <div v-for="(offItem, i) in offConfig" :key="i">
      <el-form-item label="执行关系">
        <div class="off-item">
          <el-select
            v-model="offItem.relationValue"
            placeholder="选择执行关系"
            style="flex-grow: 1; margin-right: 4px"
          >
            <el-option
              v-for="item in type"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            />
          </el-select>
          <el-icon
            v-if="offConfig.length > 1"
            @click="delOffItem(i)"
            class="del-item"
          >
            <Delete />
          </el-icon>
        </div>
      </el-form-item>

      <div class="parallel">
        <div
          v-for="(actionItem, idx) in offItem.actions"
          class="parallel-list"
          :key="idx"
        >
          {{ getActionsLabels(actionItem) }}

          <el-icon
            @click="delAction(offItem.actions, idx)"
            class="del-item"
          >
            <Delete />
          </el-icon>
        </div>

        <el-button
          @click="openAction(offItem)"
          class="add-action"
          >
          + 添加动作
        </el-button>
      </div>
    </div>
    <el-button
      @click="addOffItem"
      class="add-relation-button"
    >
      + 添加执行关系
    </el-button>
  </div>

  <ActionModal ref="actionModalRef" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import ActionModal from './components/ActionModal.vue';

const offConfig = reactive([{
  relationValue: '1',
  actions: [] as Array<Record<string, any>>,
}])

const delOffItem = (idx) => {
  offConfig.splice(idx, 1)
}

const delAction = (actions: Record<string, any>[], idx: number) => {
  actions.splice(idx, 1)
}

const addOffItem = () => {
  offConfig.push({
    relationValue: '1',
    actions: [] as Array<Record<string, any>>,
  })
}

const actionModalRef = ref<InstanceType<typeof ActionModal>>()
const openAction = (offItem: any) => {
  function cb(action) {
    offItem.actions.push(action)
  }

  actionModalRef.value?.open(cb)
}

const type = [
  { value: '1', label: '串行' },
  { value: '2', label: '并行' },
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

<style lang="scss" scoped>
.off-item {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 5px;
}
.parallel-list {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding: 4px 12px;
  font-size: 14px;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  width: 492px;
  margin-left: 68px;
  box-sizing: border-box;
}
.del-item {
  cursor: pointer;
  color: red;
}
.add-action {
  margin-top: 10px;
  width: 492px;
  margin-left: 68px
}
.add-relation-button {
  margin-top: 30px;
  width: 100%;
}
::v-deep .el-form-item--default {
  margin-bottom: 0;
}
</style>