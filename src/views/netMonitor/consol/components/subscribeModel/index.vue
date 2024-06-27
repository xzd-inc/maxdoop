<template>
  <el-dialog v-model="openVisible" width="500" title="订阅设备" append-to-body>
    <div style="margin: 20px 0;">
      <el-radio-group v-model="tab">
        <el-radio-button label="订阅入库" value="finished" />
        <el-radio-button label="未入库" value="unfinish" />
        <el-radio-button label="黑名单" value="blacklist" />
      </el-radio-group>
    </div>
    <el-form ref="formRef" style="max-width: 600px" :model="form" :rules="rules">
      <el-form-item prop="id" label="设备ID" palceholder="请输入" v-if="tab === 'finished'">
        <el-input />
      </el-form-item>
      <div v-if="tab === 'unfinish'">
        <el-form-item prop="produceIdentify" label="产品标识" palceholder="请输入">
          <el-input />
        </el-form-item>
        <el-form-item prop="deviceIdentify" label="设备标识" palceholder="请输入">
          <el-input />
        </el-form-item>
      </div>
      <el-form-item prop="deviceIP" label="设备IP" palceholder="请输入" v-if="tab === 'blacklist'">
        <el-input />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="openVisible = false">取消</el-button>
        <el-button type="primary" @click="openVisible = false">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const openVisible = ref(false);
const tab = ref('finished');
const form = ref();

const rules = reactive({
  id: [{ required: true, message: "请输入" }],
  produceIdentify: [{required: true, message: "请输入"}],
  deviceIdentify:[{ required: true, message: "请输入" }],
  deviceIP:[{ required:true, message: "请输入" }]
})

defineExpose({
  show() {
    openVisible.value = true;
  }
})
</script>