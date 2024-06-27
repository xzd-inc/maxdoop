<template>
  <el-dialog v-model="isVisible" width="800" title="服务详情" class="service-dialog">
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
        <span class="label">必选服务：</span>
     </div>
     <div class="service-item">
        <div class="service-item-div">输入参数：</div>
        <el-table :data="detail?.inputData" :header-row-style="{ '--el-table-header-bg-color': '#F5F7FA'  }">
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="identifier" label="标识"></el-table-column>
          <el-table-column prop="type" label="数据类型"></el-table-column>
          <el-table-column prop="value" label="取值范围">
            <template #default="scope">
              {{  scope.row.min }} ~ {{  scope.row.max }}
            </template>
          </el-table-column>
          <el-table-column prop="unitName" label="单位"></el-table-column>
          <el-table-column prop="step" label="步长"></el-table-column>
          <el-table-column prop="required" label="必选属性"></el-table-column>
          <el-table-column prop="accessMode" label="读写类型"></el-table-column>
        </el-table>
     </div>
     <div class="service-item">
        <div class="service-item-div">输出参数：</div>
        <el-table :data="detail?.outputData" :header-row-style="{ '--el-table-header-bg-color': '#F5F7FA' }">
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="identifier" label="标识"></el-table-column>
          <el-table-column prop="type" label="数据类型"></el-table-column>
          <el-table-column prop="value" label="取值范围">
            <template #default="scope">
              {{ scope.row.min }} ~ {{  scope.row.max }}
            </template>
          </el-table-column>
          <el-table-column prop="unitName" label="单位"></el-table-column>
          <el-table-column prop="step" label="步长"></el-table-column>
          <el-table-column prop="required" label="必选属性"></el-table-column>
          <el-table-column prop="accessMode" label="读写类型"></el-table-column>
        </el-table>
     </div>
     <div class="service-item">
        <span class="label">说明：</span>
        {{ detail?.remark }}
     </div>
   </div>
  </el-dialog>
 </template>
 
 <script setup lang="ts">
 import { ref } from 'vue';
 const isVisible = ref(false);
 const detail = ref();
 
 defineExpose({
  show(row) {
    isVisible.value = true;
    detail.value = row;
  }
 })
 </script>

<style lang="scss" scoped>
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
.table-box .el-table .el-table__header th, .table-main .el-table .el-table__header th{
  font-size: 15px;
  font-weight: bold;
  color: #606266;
  margin-bottom: 10px
}
</style>