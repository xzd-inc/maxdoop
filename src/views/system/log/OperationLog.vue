<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      :columns="columns"
      :request-api="getOperationList"
      :init-param="initParam"
      :tool-button="['refresh']"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="Download" plain @click="downloadFile">导出</el-button>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
import { Log } from "@/api/interface";
import ProTable from "@/components/ProTable/index.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { Download } from "@element-plus/icons-vue";
import { getOperationList, exportOperationList } from "@/api/modules/log";
import { logStatus } from "@/utils/dict";
import { useDownload } from "@/hooks/useDownload";
import { ElMessageBox } from "element-plus";

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 如果表格需要初始化请求参数，直接定义传给 ProTable (之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({});

// 表格配置项
const columns = reactive<ColumnProps<Log.Response>[]>([
  {
    prop: "account",
    label: "用户名"
  },
  {
    prop: "operation",
    label: "用户操作"
  },
  {
    prop: "requestUri",
    label: "请求URI"
  },
  {
    prop: "requestMethod",
    label: "请求方式"
  },
  {
    prop: "requestParams",
    label: "请求参数"
  },
  {
    prop: "requestTime",
    label: "请求时长",
    render({ row }) {
      return row.requestTime + "ms";
    }
  },
  {
    prop: "status",
    label: "状态",
    enum: logStatus,
    search: { el: "select" },
    tag: true
  },
  {
    prop: "ip",
    label: "操作IP"
  },
  {
    prop: "userAgent",
    label: "用户代理"
  },
  {
    prop: "createTime",
    label: "创建时间"
  }
]);
// 导出用户列表
const downloadFile = async () => {
  ElMessageBox.confirm("确认导出日志数据?", "温馨提示", { type: "warning" }).then(() =>
    useDownload(exportOperationList, "日志", proTable.value?.searchParam)
  );
};
</script>
