<template>
  <el-tabs v-model="tabName" type="card" editable @edit="editRuleExecutorDtos">
    <el-tab-pane
      v-for="(item, i) in ruleExecutorDtos"
      :label="`条件${i + 1}`"
      :name="i"
      :key="i"
    >
      <ActuatorItem
        v-for="(_, i) in item.executorConditions"
        :idx="i"
        v-model="item.executorConditions[i]"
        :key="i"
      />
      <!-- <OpenAction />
      <el-button class="add-relation_button" @click="addOffItem">
        + 添加执行关系duo
      </el-button>
      <el-form-item label="否则">
        <el-button @click="elseButton">+</el-button>
      </el-form-item>
      <OpenAction v-if="isShowElseRelation" />
      <el-button class="add-relation_button" v-if="isShowElseRelation" @click="addOffItem">
        + 添加执行关系否则
      </el-button> -->
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import ActuatorItem from './components/ActuatorItem.vue'

const tabName = ref(0)

const ruleExecutorDtos = reactive([
  {// 条件一
    "executorConditions": [ // 条件表达式
      {
        "condition_expression": [
          {
            "expression_param": "pre", // 参数
            "expression_operator": "<", // 操作   有（1.> 2.< 3.= 三种）
            "expression_value": "1", // 参数值
          },
          {
            "expression_param": "hum",
            "expression_operator": "=",
            "expression_value": "60",
            "expression_relation": "or"
          },
          {
            "expression_param": "tem",
            "expression_operator": ">",
            "expression_value": "40",
            "expression_relation": "and" // and:并且  or:或者  （当有前上一个元素时，该元素的condition_relation属性 才需要配置,第一个元素不需要配置）
          }
        ]
      },
      // {
      //   "condition_relation": "and", // and:并且  or:或者  （当有前上一个元素时，该元素的condition_relation属性 才需要配置，第一个元素不需要配置）
      //   "condition_expression": [
      //     {
      //       "expression_param": "pre",
      //       "expression_operator": "<",
      //       "expression_value": "2",
      //     },
      //     {
      //       "expression_param": "hum",
      //       "expression_operator": "=",
      //       "expression_value": "40",
      //       "expression_relation": "and"
      //     }
      //   ]
      // }
    ],
    "executorConfigs": {
      "branchActionTrue": [ // 当条件执行为true时执行的分支
        {
          "type": "1", // 1.串行 2.并行
          "actions": [
            {
              "executor_content": "deviceOutputNode", // 设备输入
              "executor_config": {
                "operator_type": "1", // 1.功能调用  2.属性读取  3.属性设置 选1就好
                "executor_target": [ // 设备的id集合.如果用户选择了产品，没有选择设备，则自动选择产品下的所有设备
                  "1791650558225674241"
                ],
                "function_id": "1792371474641072130", // 方法的Id
                "params": { // 调用方法时的入参  /rest/auth/thingsModel/function/no-page/query 的  集合中每个元素的inputData字段中的集合
                  "setTemperature": "55" // 请求参数  key：参数的唯一标识   value:用户输入的值
                }
              }
            }
          ]
        },
        {
          "type": "2",
          "actions": [
            {
              "executor_content": "deviceOutputNode", // 设备输入
              "executor_config": {
                "operator_type": "1", // 1.功能调用  2.属性读取  3.属性设置 选1就好
                "executor_target": [ // 设备的id集合.如果用户选择了产品，没有选择设备，则自动选择产品下的所有设备
                  "1791650558225674241"
                ],
                "function_id": "1792371474641072130", // 方法的Id
                "params": { // 调用方法时的入参  /rest/auth/thingsModel/function/no-page/query 的  集合中每个元素的inputData字段中的集合
                  "setTemperature": "55" // 请求参数  key：参数的唯一标识   value:用户输入的值
                }
              }
            }
          ]
        }
      ],
      "branchActionFalse": [ // 当条件执行为false时执行的分支
        {
          "type": "1", // 1.串行 2.并行
          "actions": [
            {
              "executor_content": "deviceOutputNode", // 设备输入
              "executor_config": {
                "operator_type": "1", // 1.功能调用  2.属性读取  3.属性设置 选1就好
                "executor_target": [ // 设备的id集合.如果用户选择了产品，没有选择设备，则自动选择产品下的所有设备
                  "1791650558225674241"
                ],
                "function_id": "1792371474641072130", // 方法的Id
                "params": { // 调用方法时的入参  /rest/auth/thingsModel/function/no-page/query 的  集合中每个元素的inputData字段中的集合
                  "setTemperature": "55" // 请求参数  key：参数的唯一标识   value:用户输入的值
                }
              }
            }
          ]
        },
        {
          "type": "2",
          "actions": [
            {
              "executor_content": "deviceOutputNode", // 设备输入
              "executor_config": {
                "operator_type": "1", // 1.功能调用  2.属性读取  3.属性设置 选1就好
                "executor_target": [ // 设备的id集合.如果用户选择了产品，没有选择设备，则自动选择产品下的所有设备
                  "1791650558225674241"
                ],
                "function_id": "1792371474641072130", // 方法的Id
                "params": { // 调用方法时的入参  /rest/auth/thingsModel/function/no-page/query 的  集合中每个元素的inputData字段中的集合
                  "setTemperature": "55" // 请求参数  key：参数的唯一标识   value:用户输入的值
                }
              }
            }
          ]
        }
      ]
    }
  }
])

const editRuleExecutorDtos = (idx: number, action: 'remove' | 'add') => {
  console.log(111, idx, action)
}

</script>
