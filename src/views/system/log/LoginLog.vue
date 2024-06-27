<template>
  <div class="table-box">
    <ProTable ref="proTable" :columns="columns" :request-api="getLoginLogList" :init-param="initParam" :tool-button="['refresh']">
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
import { getLoginLogList, exportLoginLogList } from "@/api/modules/log";
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
    prop: "searchText",
    label: "搜索",
    isShow: false,
    search: { el: "input", tooltip: "输入名字搜索" }
  },
  {
    prop: "account",
    label: "用户名"
  },
  {
    prop: "operation",
    label: "操作类型",
    enum: [
      { label: "登录", value: "0" },
      { label: "登出", value: "1" }
    ]
  },
  {
    prop: "status",
    label: "状态",
    enum: [...logStatus, { label: "账号锁定", value: "2" }],
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
    useDownload(exportLoginLogList, "日志", proTable.value?.searchParam)
  );
};
</script>
