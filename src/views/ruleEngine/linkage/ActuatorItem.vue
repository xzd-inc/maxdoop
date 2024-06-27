<template>
  <div>
    <div class="Select-options">

      <div v-for="(v, i) in list" :key="i">

        <div v-if="i === 0">当:</div>
        <div v-else style="margin-bottom: 5px;">
          <el-select placeholder="并且" class="Select-option" v-model="v.condition_relation">
            <el-option v-for="itemGroup in expression_relation" :key="itemGroup.value" :label="itemGroup.label"
              :value="itemGroup.value" />
          </el-select>
          <el-icon @click="delGroup(list, i)" style="color: red; cursor: pointer;">
            <Delete />
          </el-icon>
        </div>
        <div>
          <div v-for="(k, i) in v.condition_expression" :key="i" class="item">
            <el-input v-model="k.expression_param" placeholder="输入参数" class="Select-option" />
            <el-select v-model="k.expression_operator" placeholder="选择操作" class="Select-option">
              <el-option v-for="item in operateOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-input v-model="k.expression_value" placeholder="输入参数值" class="Select-option" />
            <el-select v-model="k.selectRelate" placeholder="选择关系" class="Select-option">
              <el-option v-for="item in expression_relation" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-icon v-if="v.condition_expression.length > 1" @click="delItem(v.condition_expression, i)" style="color: red; cursor: pointer;">
              <Delete />
            </el-icon>
          </div>

          <div style="margin-bottom: 10px;">
            <el-button class="inputAdd" @click="addItem(v.condition_expression)">+</el-button>
            <div style="border: 1px dashed #CCCCCC; width: 87%; margin: 5px 60px;"></div>
          </div>
        </div>
      </div>
    </div>

    <div style="margin-bottom: 10px;">
      <el-button class="inputAdd" @click="addGroup">+ 分组</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, defineModel } from 'vue';

const list: any = defineModel()

const init = {
  expression_param: '',
  expression_operator: '',
  expression_value: '',
  selectRelate: '',
}

const addGroup = () => {
  list.value.push({
    condition_relation: '',
    condition_expression: [
      {
        expression_param: '',
        expression_operator: '',
        expression_value: '',
        selectRelate: '',
      }
    ]
  })
}

const delGroup = (v, i) => {
  v.splice(i, 1)
}

const addItem = (v) => {
  v.push({ ...init })
}

const delItem = (v, i) => {
  v.splice(i, 1)
}

const operateOptions = [
  { value: '>', label: '>' },
  { value: '<', label: '<' },
  { value: '=', label: '=' },
]

const expression_relation = [
  { value: 'and', label: '并且' },
  { value: 'or  ', label: '或者' },
]

</script>

<style scoped>
.Select-options {
  /* display: flex; */
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
  width: 88%
}
</style>
