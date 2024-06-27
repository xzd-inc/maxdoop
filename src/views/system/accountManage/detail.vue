<template>
  <div class="container">
    <el-card>
      <template #header>
        <div class="mf-title">基础信息</div>
      </template>
      <el-descriptions>
        <el-descriptions-item label="账号">{{ detail?.account }}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{ detail?.userName }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ detail?.createTime }}</el-descriptions-item>
        <el-descriptions-item label="小程序">
          <el-button type="primary" link @click="openCode">获取二维码</el-button>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="box-card table">
      <template #header>
        <div class="mf-title">角色列表</div>
      </template>
      <ProTable
        ref="proTable"
        :columns="columns"
        :data="detail?.roleDtos"
        :tool-button="false"
        :default-expand-all="true"
        :pagination="false"
      >
      </ProTable>
      <OpenCode  ref="codeRef"/>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="roleDetail">
import { useRoute } from "vue-router";
import { ref, onMounted, reactive } from "vue";
import { getUserDetail, getUserCode } from "@/api/modules/user";
import { User, Role } from "@/api/interface";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import ProTable from "@/components/ProTable/index.vue";
import { roleType } from "@/utils/dict";
import OpenCode from './components/OpenCode.vue';

const codeRef = ref<any>();
const route = useRoute();
const detail = ref<User.ResUserList>();

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 表格配置项
const columns = reactive<ColumnProps<Role.Response>[]>([
  {
    prop: "roleName",
    label: "名称"
  },
  {
    prop: "roleType",
    label: "类型",
    enum: roleType
  },
  {
    prop: "remark",
    label: "描述"
  },
  {
    prop: "createTime",
    label: "创建时间"
  }
]);

// 获取二维码
async function openCode () {
  codeRef.value.show();
  // const res  = await getUserCode({ scene: route.params.id })
  // console.log('detail1111',res);
  
}

// 获取详情信息
async function getDetail() {
  const { data } = await getUserDetail({ userId: route.params.id });
  detail.value = data;
}

onMounted(() => {
  getDetail();
});
</script>

<style lang="scss" scoped>
@import "@/styles/element.scss";

.container {
  height: 100%;
  :deep(.el-tabs__header) {
    @include card;
    padding: 0 20px;
    margin-bottom: 10px;
    .el-tabs__nav-wrap::after {
      height: 0;
    }
  }
}
.box-card {
  margin-top: 10px;
}
.table {
  :deep(.el-card__body) {
    height: calc(100vh - 390px);
  }
}
</style>
