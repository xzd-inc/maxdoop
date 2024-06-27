<template>
  <el-drawer v-model="drawerVisible" title="编辑执行器" :size="600">
    <el-form>
      <el-form-item label="过滤" prop="condition">
        <el-select v-model="condition" placeholder="关闭">
          <el-option
            v-for="item in conditionSwithch"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          />
        </el-select>
      </el-form-item>
      <!-- 单条件 -->
       <Single v-if="condition === 'off'" />
      <!-- 多条件 -->
       <Multiple v-if="condition === 'open'" />
      <!-- <div v-if="condition === 'open'">
        <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
          <el-tab-pane v-for="(item, i) in editableTabs" :key="item.title + i" :label="`条件${i + 1}`" :name="i + 1 + ''">
            <ActuatorItem v-model="item.executorConditions" />
            <OpenAction />
            <el-button class="add-relation_button" @click="addOffItem">
              + 添加执行关系duo
            </el-button>
            <el-form-item label="否则">
              <el-button @click="elseButton">+</el-button>
            </el-form-item>
            <OpenAction v-if="isShowElseRelation" />
            <el-button class="add-relation_button" v-if="isShowElseRelation" @click="addOffItem">
              + 添加执行关系否则
            </el-button>
          </el-tab-pane>
        </el-tabs>
      </div> -->

    </el-form>

    <ActionModal ref="actionModalRef" />

    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawerVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </template>
  </el-drawer>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import ActuatorItem from './components/ActuatorItem.vue';
import OpenAction from './components/OpenAction.vue';
import { TabPaneName, ElMessage } from 'element-plus';
// import { ruleEngine } from '@/api/interface';
import { addHandActuator } from '@/api/modules/ruleEngine';
import ActionModal from './components/ActionModal.vue';
import { useRoute } from 'vue-router';

import Single from './Single.vue'
import Multiple from './Multiple.vue'

const route = useRoute();
const id = route.params.id

const isShowElseRelation = ref(false)
const condition = ref('open');

const init = {
  relationValue: '1',
  actions: [] as Array<Record<string, any>>,
}

const offConfig = ref([structuredClone(init)])

const addOffItem = () => {
  offConfig.value.push(structuredClone(init))
}

const drawerVisible = ref(false);

let tabIndex = 2
const editableTabsValue = ref('1')
const editableTabs = ref([
  {
    title: '条件',
    name: '1',
    executorConditions: [
      {
        condition_relation: '',
        condition_expression: [
          {
            expression_param: '',
            expression_operator: '',
            expression_value: '',
            selectRelate: '',
          }
        ]
      }
    ]
  },
])

const conditionSwithch = [
  { value: 'off', label: '关闭' },
  { value: 'open', label: '打开' }
]

const actionModalRef = ref<InstanceType<typeof ActionModal>>()

const elseButton = () => {
  isShowElseRelation.value = true;
}

const handleTabsEdit = (
  targetName: TabPaneName | undefined,
  action: 'remove' | 'add'
) => {
  if (action === 'add') {
    const newTabName = `${++tabIndex}`
    editableTabs.value.push({
      title: '条件',
      name: newTabName,
      executorConditions: [
        {
          condition_relation: '',
          condition_expression: [
            {
              expression_param: '',
              expression_operator: '',
              expression_value: '',
              selectRelate: '',
            }
          ]
        }
      ]
    })
    editableTabsValue.value = newTabName
  } else if (action === 'remove') {
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }

    editableTabsValue.value = activeName
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
  }
}

const handleSubmit = () => {
  if (!offConfig.value[0]?.actions.length) {
    ElMessage.error('请添加执行动作')
    return
  }
  addHandActuator({
    "id": id,
    "ruleType": "3",
    "ruleExecutorDtos": {
      "executorConfigs": {
        branchActionTrue: offConfig.value.map(v => {
          return {
            "type": v.relationValue,
            "actions": v.actions.map(k => {
              return {
                "executor_content": "deviceOutputNode",
                "uuid": "",
                "executor_config": {
                  "operator_type": "1",
                  "executor_target": k.executor_target.map(v => v.value),
                  "function_id": k.function_id.value,
                  "params": {
                    [k.inputData[0].identifier]: k.inputData[0]?.value
                  }
                }
              }
            })
          }
        })
      },
      "executorConditions": editableTabs.value,
    }
  }).then(res => {
    ElMessage.success('保存成功')
    drawerVisible.value = false
  })

};

defineExpose({
  openActuator() {
    drawerVisible.value = true;

    offConfig.value = [structuredClone(init)]
  }
})
</script>

<script lang="ts">
const obj = {
  "id": "1783694690885603330", // 规则Id  
  "ruleType": "1", // 1. 条件     3.手动
  "ruleExecutorDtos": [
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
        {
          "condition_relation": "and", // and:并且  or:或者  （当有前上一个元素时，该元素的condition_relation属性 才需要配置，第一个元素不需要配置）
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
        }
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
  ]
}
</script>

<style scoped>
.inputAdd {
  width: 100%;
}

.inputAddElse {
  margin: 5px 60px;
  width: 84%;
}

.parallel {
  margin: 5px 68px;
  width: 88%;
}

.parallel-list {
  margin: 10px 0;
  padding: 4px 12px;
  font-size: 14px;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
}

.parallel-button {
  width: 100%;
}

.strand-list {
  margin: 10px 0;
  padding: 4px 12px;
  font-size: 14px;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  margin-left: 66px;
}

.add-relation-button {
  margin-left: 0;
  margin-top: 10px;
  width: 492px;
  margin-left: 68px
}

.add-relation_button {
  width: 84%;
  margin-left: 60px;
  margin-bottom: 10px;
}
</style>
