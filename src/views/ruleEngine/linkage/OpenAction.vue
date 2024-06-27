<template>
  <div>
    <el-form-item label="执行" prop="conditions">
      <el-select v-model="relationValue" placeholder="选择执行关系">
        <el-option v-for="item in relation" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <div v-if="relationValue === '1'" class="parallel">
      <div class="parallel-list">读取 设备名称 参数名称</div>
    </div>
    <div style="margin-bottom: 10px;">
      <el-button class="inputAdd" @click="openAction">+ 添加动作</el-button>
    </div>
    <ActionModal ref="actionModalRef"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ActionModal from './ActionModal.vue';
import { ruleEngine } from '@/api/interface';

const actionModalRef = ref<InstanceType<typeof ActionModal>>()

const relationValue = ref('');
const relation = [
  { value: '1', label: '并行' },
  { value: '2', label: '串行' }
]

const openAction = (title: "编辑", row?: ruleEngine.linkage) => {
  function cb(action) {
    // offItem.actions.push(action)
  }

  actionModalRef.value?.open(cb)
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
}

.inputAdd {
  margin: 5px 60px;
  width: 84%
}
</style>