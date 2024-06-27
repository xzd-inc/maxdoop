<template>
  <el-dialog v-model="dialogVisible" width="800" title="服务详情" class="service-dialog">
    <div>
      <div class="service-item">
        <span class="label">名称：</span>
        {{ detail?.name }}
      </div>
      <div class="service-item">
        <span class="label">标识：</span>
        {{ detail?.identifier }}
      </div>
      <div class="service-item">
        <span class="label">是否异步：</span>
        {{detail?.callType === '1' ? '同步': '异步' }}
      </div>
      <div class="service-item">
        <div class="service-item-div">输入参数：</div>
        <el-table :data="detail?.inputData" :header-row-style="{ '--el-table-header-bg-color': '#F5F7FA' }">
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="identifier" label="标识" />
          <el-table-column prop="linkFunctionVo.functionContent" label="值" />
          <el-table-column prop="type" label="数据类型" />
          <el-table-column prop="value" label="取值范围">
            <template #default="scope">
              {{ scope.row.min }} ~ {{ scope.row.max }}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="service-item">
        <div class="service-item-div">输出参数：</div>
        <el-table :data="detail?.outputData" :header-row-style="{ '--el-table-header-bg-color': '#F5F7FA' }">
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="identifier" label="标识" />
          <el-table-column prop="linkFunctionVo.functionContent" label="值" />
          <el-table-column prop="type" label="数据类型" />
          <el-table-column prop="value" label="取值范围">
            <template #default="scope">
              {{ scope.row.min }} ~ {{ scope.row.max }}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="service-item">
        <span class="label">说明：</span>
        {{ detail?.remark }}
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineExpose, watch } from 'vue';
import { detailServe, detailServes } from '@/api/modules/device'
import { useRoute } from 'vue-router';

const dialogVisible = ref(false)
const detail = ref()
const route = useRoute();

defineExpose({
  show(functionId) {
    detailServes({ functionId, deviceId:route.params.id})
      .then(res => {
        detail.value = res.data
      })
      dialogVisible.value = true;
  }
})
</script>

<style lang="scss">
.service-dialog {
  .service-item {
    margin: 15px 0;
  }
  .label {
    color: #606266;
    font-size: 14px;
    display: inline-block;
    width: 90px;
    text-align: right;
    margin-right: 20px
  }
  .service-item-div {
    width: 90px;
    text-align: right;
    color: #606266;
    margin-bottom: 10px
  }
}
</style>