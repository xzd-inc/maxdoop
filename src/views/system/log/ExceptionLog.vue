<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      :columns="columns"
      :request-api="getExceptionLogList"
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
import { getExceptionLogList, exportExceptionLog } from "@/api/modules/log";
import { useDownload } from "@/hooks/useDownload";
import { ElMessageBox } from "element-plus";

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 如果表格需要初始化请求参数，直接定义传给 ProTable (之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({});

// 表格配置项
const columns = reactive<ColumnProps<Log.Exception>[]>([
  {
    prop: "account",
    label: "用户名"
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
  },
  {
    prop: "op",
    label: "操作",
    render({ row }) {
      return (
        <el-button
          type="primary"
          link
          onClick={() => {
            ElMessageBox.alert(row.errorInfo, "异常信息", { customStyle: { maxWidth: "800px" } });
          }}
        >
          异常信息
        </el-button>
      );
    }
  }
]);
// 导出用户列表
const downloadFile = async () => {
  ElMessageBox.confirm("确认导出日志数据?", "温馨提示", { type: "warning" }).then(() =>
    useDownload(exportExceptionLog, "日志", proTable.value?.searchParam)
  );
};
</script>
