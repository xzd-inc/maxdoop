<template>
  <el-dialog v-model="dialogVisible" title="日志" :destroy-on-close="true" width="900px" draggable>
    <div class="no-card">
      <ProTable
        ref="proTable"
        :columns="columns"
        :request-api="getAllUserList"
        :tool-button="false"
        :init-param="initParam"
        :request-auto="false"
      >
      </ProTable>
    </div>
  </el-dialog>
</template>

<script setup lang="ts" name="LogDialog">
import { ref, reactive, nextTick } from "vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import ProTable from "@/components/ProTable/index.vue";
import { User } from "@/api/interface";
import { getAllUserList } from "@/api/modules/user";
import { useRoute } from "vue-router";

const route = useRoute();

// ProTable 实例
const proTable = ref<ProTableInstance>();
// dialog状态
const dialogVisible = ref(false);
const initParam = reactive({ id: route.params.id as string });

// 表格配置项
const columns = reactive<ColumnProps<User.ResUserList>[]>([
  {
    prop: "roleName",
    label: "类型"
  },
  {
    prop: "roleType",
    label: "时间"
  },
  {
    prop: "remark",
    label: "日志内容"
  }
]);

function show() {
  dialogVisible.value = true;
  nextTick(() => {
    proTable.value?.getTableList();
  });
}

defineExpose({
  show
});
</script>
<style lang="scss" scoped>
.no-card {
  height: 520px;
}
</style>
