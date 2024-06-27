<template>
  <div>
    <div
      v-for="(item, idx) in executorConditions"
      class="Select-options"
      :key="idx"
    >
      <div>
        <div v-if="!idx">当:</div>

        <div v-else class="else-select">
          <el-select placeholder="并且" class="Select-option" v-model="item?.condition_relation">
            <el-option
              v-for="itemGroup in relationList"
              :key="itemGroup.value"
              :label="itemGroup.label"
              :value="itemGroup.value"
            />
          </el-select>
          <el-icon
            @click="delExecutorCondition(idx)"
            class="del-icon"
          >
            <Delete />
          </el-icon>
        </div>

        <!-- <div> -->
          <div
            v-for="(k, i) in item.condition_expression"
            :key="i"
            class="item"
          >
            <el-input
              v-model="k.expression_param"
              placeholder="输入参数"
              class="Select-option"
            />
            <el-select
              v-model="k.expression_operator"
              placeholder="选择操作"
              class="Select-option"
            >
              <el-option
                v-for="item in operateOptions"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              />
            </el-select>
            <el-input
              v-model="k.expression_value"
              placeholder="输入参数值"
              class="Select-option"
            />
            <el-select
              v-model="k.expression_relation"
              placeholder="选择关系"
              class="Select-option"
            >
              <el-option
                v-for="item in relationList"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              />
            </el-select>

            <el-icon
              v-if="item.condition_expression.length > 1"
              @click="delItem(item.condition_expression, i)"
              class="del-icon"
            >
              <Delete />
            </el-icon>
          </div>

          <div style="margin-bottom: 10px">
            <el-button class="inputAdd" @click="addItem(item.condition_expression)">+</el-button>
            <div style="border: 1px dashed #cccccc; width: 87%; margin: 5px 60px"></div>
          </div>

        <!-- </div> -->
      </div>
    </div>

    <div style="margin-bottom: 10px">
      <el-button class="inputAdd" @click="addGroup">+ 分组</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineModel } from 'vue'

const props = defineProps(['idx'])

const a = [{
  "condition_relation": "and",
  "condition_expression": [
    {
      "expression_param": "pre",
      "expression_operator": "<",
      "expression_value": "2",
    },
    {
      "expression_param": "hum",
      "expression_operator": "=",
      "expression_value": "40",
      "expression_relation": "and"
    }
  ]
}]

const executorConditions = defineModel<IExecutorConditions>()

const init = {
  expression_param: 'hum',
  expression_operator: '=',
  expression_value: '60',
  expression_relation: 'or',
}

const addGroup = () => {
  executorCondition.value?.push({
    condition_relation: '',
    condition_expression: [
      {
        expression_param: '',
        expression_operator: '',
        expression_value: '',
        selectRelate: '',
      },
    ],
  })
}

const delExecutorCondition = (idx) => {
  executorConditions.value?.splice(idx, 1)
}

const addItem = v => {
  item.push({ ...init })
}

const delItem = (v, i) => {
  item.splice(i, 1)
}

const operateOptions = [
  { value: '>', label: '>' },
  { value: '<', label: '<' },
  { value: '=', label: '=' },
] as const

const relationList = [
  { value: 'and', label: '并且' },
  { value: 'or  ', label: '或者' },
] as const

type IExecutorConditions = Array<{ condition_relation: string, condition_expression: ICondition_expression }>

type ICondition_expression = ICondition_expression_item[]

interface ICondition_expression_item {
  expression_param: string
  expression_operator: string
  expression_value: number | string
  expression_relation: string
}

</script>

<style scoped>
.Select-options {
  margin: 5px 5px;
  align-items: flex-start;
}

.item {
  margin-bottom: 5px;
  margin-left: 40px;
}

.Select-option {
  width: 120px;
  margin: 0 3px;
}

.inputAdd {
  margin: 5px 60px;
  width: 88%;
}
.else-select {
  margin-bottom: 5px;
}
.del-icon {
  color: red;
  cursor: pointer;
}
</style>
