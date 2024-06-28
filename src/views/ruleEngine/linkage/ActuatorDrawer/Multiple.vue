<template>
  <el-tabs v-model="tabName" type="card" editable @edit="editRuleExecutorDtos">
    <el-tab-pane v-for="(item, i) in ruleExecutorDtos" :label="`条件${i + 1}`" :name="i" :key="i">
      <!-- 条件 -->
      <ActuatorItem v-model="item.executorConditions" />
      <!-- 条件为 true 的执行 -->
      <OpenAction v-model="item.executorConfigs.branchActionTrue" />

      <el-form-item label="否则">
        <el-button @click="elseButton(item.executorConfigs.branchActionFalse)">+</el-button>
      </el-form-item>
      <OpenAction
        v-if="item.executorConfigs.branchActionFalse?.length"
        v-model="item.executorConfigs.branchActionFalse"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import ActuatorItem from './components/ActuatorItem.vue'
import OpenAction from './components/OpenAction.vue'

const tabName = ref(0)

const ruleExecutorDtos = reactive([
  {
    executorConditions: [ // 条件表达式
      {
        condition_expression: [
          {
            expression_param: '', // 参数
            expression_operator: '', // 操作   有（1.> 2.< 3.= 三种）
            expression_value: '', // 参数值
          },
        ]
      },
    ],
    executorConfigs: {
      branchActionTrue: [ // 当条件执行为true时执行的分支
        {
          type: '', // 1.串行 2.并行
          actions: []
        },
      ],
      branchActionFalse: [ // 当条件执行为false时执行的分支
        // {
        //   type: '', // 1.串行 2.并行
        //   actions: []
        // },
      ]
    }
  }
])

const editRuleExecutorDtos = (idx: number, action: 'remove' | 'add') => {
  if (action === 'remove') {
    ruleExecutorDtos.splice(idx, 1)
  } else {
    ruleExecutorDtos.push({
      executorConditions: [ // 条件表达式
        {
          condition_expression: [
            {
              expression_param: '', // 参数
              expression_operator: '', // 操作   有（1.> 2.< 3.= 三种）
              expression_value: '', // 参数值
            },
          ]
        },
      ],
      executorConfigs: {
        branchActionTrue: [ // 当条件执行为true时执行的分支
          {
            type: '', // 1.串行 2.并行
            actions: []
          },
        ],
        branchActionFalse: [ // 当条件执行为false时执行的分支

        ]
      }
    })
  }
}

const elseButton = (branchActionTrue: object[]) => {
  if (!branchActionTrue?.length) {
    branchActionTrue.push({ type: '', actions: [] })
  }
}

</script>
