<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      :columns="columns"
      :request-api="getThingModelListApi"
      :init-param="initParam"
      :tool-button="['refresh']"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button v-auth="'add'" type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增物模型</el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button v-auth="'view'" type="primary" link :icon="View" @click="toDetail(scope.row.id)">详情</el-button>
        <el-button v-auth="'edit'" type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button v-auth="'delete'" type="primary" link :icon="Delete" @click="deleteThingModel(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <EditDrawer ref="drawerRef" />
  </div>
</template>

<script setup lang="tsx" name="thingModelList">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ThingModel } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import EditDrawer from "./EditDrawer.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import { getThingModelListApi, addThingModel, editThingModel, deleteThingModelApi } from "@/api/modules/thingModel";
import { useHasAuth } from "@/hooks/useHasAuth";

const hasAuth = useHasAuth(["edit", "delete", "view"]);

const router = useRouter();

// 跳转详情页
const toDetail = (id: string) => {
  router.push(`/access/thinkModel/detail/${id}`);
};

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 如果表格需要初始化请求参数，直接定义传给 ProTable (之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({});

// 表格配置项
const columns = reactive<ColumnProps<ThingModel.Response>[]>([
  {
    prop: "searchText",
    label: "搜索",
    isShow: false,
    search: { el: "input", tooltip: "输入名字搜索" }
  },
  {
    prop: "modelName",
    label: "名称"
  },
  {
    prop: "id",
    label: "ID"
  },
  {
    prop: "createTime",
    label: "创建时间"
  },
  { prop: "operation", label: "操作", fixed: "right", isShow: hasAuth, width: 260 }
]);

// 删除物模型信息
const deleteThingModel = async (params: ThingModel.Response) => {
  await useHandleData(deleteThingModelApi, [params.id], `删除【${params.modelName}】物模型`);
  proTable.value?.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof EditDrawer> | null>(null);
const openDrawer = (title: string, row?: ThingModel.Response) => {
  const params = {
    title,
    row: row ? { id: row.id, remark: row.remark, modelName: row.modelName } : {},
    api: title === "新增" ? addThingModel : editThingModel,
    refresh: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};
</script>
