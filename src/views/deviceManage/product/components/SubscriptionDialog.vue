<template>
  <el-dialog v-model="dialogVisible" title="订阅信息" :destroy-on-close="true" width="900px" draggable>
    <div class="no-card">
      <ProTable
        ref="proTable"
        :columns="columns"
        :request-api="getAllUserList"
        :tool-button="false"
        :init-param="initParam"
        :request-auto="false"
      >
        <template #operation="scope">
          <el-button type="danger" link :icon="Delete" @click="deleteProduct(scope.row)">删除</el-button>
        </template>
      </ProTable>
    </div>
  </el-dialog>
</template>

<script setup lang="ts" name="SubscriptionDialog">
import { ref, reactive, nextTick } from "vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import ProTable from "@/components/ProTable/index.vue";
import { User } from "@/api/interface";
import { getAllUserList, deleteUserApi } from "@/api/modules/user";
import { Delete } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { useHandleData } from "@/hooks/useHandleData";

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
    label: "产品ID"
  },
  {
    prop: "roleType",
    label: "消息类别"
  },
  {
    prop: "remark",
    label: "订阅级别"
  },
  {
    prop: "createTime",
    label: "订阅方URL"
  },
  {
    prop: "operation",
    label: "操作"
  }
]);

// 删除产品信息
const deleteProduct = async (params: User.ResUserList) => {
  await useHandleData(deleteUserApi, [params.id], `删除【${params.userName}】产品`);
  proTable.value?.getTableList();
};

function show() {
  dialogVisible.value = true;
  nextTick(() => {
    console.log("proTable.value===", proTable.value);
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
