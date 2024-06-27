<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      :columns="columns"
      :request-api="getThingModelServiceNopage"
      :init-param="initParam"
      :tool-button="['refresh']"
      :pagination="false"
    >
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增服务</el-button>
      </template>
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDialog(scope.row)">查看</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button type="primary" link :icon="Delete" @click="del(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <el-drawer v-model="drawerProps.visible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}服务`">
      <ServerForm ref="formRef" v-model="drawerProps.formData" />
      <template #footer>
        <el-button @click="drawerProps.visible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-drawer>
    <ServerDetail ref="dialogRef"/>
  </div>
</template>

<script setup lang="tsx" name="thingModelServer">
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { ThingModel } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import {
  getThingModelServiceNopage,
  addThingModelService,
  editThingModelService,
  deleteThingModelService
} from "@/api/modules/thingModel";
import ServerForm from "./ServerForm.vue";
import { ElMessage } from "element-plus";
import ServerDetail from './ServerDetail.vue';

type Title = "新增" | "编辑";
interface DrawerProps {
  title: Title;
  visible: boolean;
  formData: ThingModel.Server;
}

const proTable = ref<ProTableInstance>();
const route = useRoute();
const dialogRef = ref<any>();

const openDialog = (row: any) => {
  dialogRef.value.show(row);
}

const initParam = reactive({ modelId: route.params.id as string });
const drawerProps = reactive<DrawerProps>({
  title: "新增",
  visible: false,
  formData: {
    componentId: undefined,
    thingId: "",
  }
});
const formRef = ref<InstanceType<typeof ServerForm>>();

// 表格配置项
const columns = reactive<ColumnProps<ThingModel.Server>[]>([
  {
    prop: "name",
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
  { prop: "operation", label: "操作", fixed: "right", width: 260 }
]);

// 删除服务信息
const del = async (params: ThingModel.Server) => {
  await useHandleData(deleteThingModelService, [params.id], `删除【${params.name}】服务`);
  proTable.value?.getTableList();
};

async function add() {
  await addThingModelService({ modelId: route.params.id as string, ...drawerProps.formData });
}

async function edit() {
  await editThingModelService({ modelId: route.params.id as string, ...drawerProps.formData });
}

async function handleSubmit() {
  formRef.value?.formRef?.validate(async valid => {
    if (!valid) return;
    try {
      if (drawerProps.title === "新增") {
        await add();
      } else {
        await edit();
      }
      ElMessage.success({ message: `${drawerProps.title}服务成功！` });
      proTable.value?.getTableList();
      drawerProps.visible = false;
    } catch (error) {
      console.log(error);
    }
  });
}

const openDrawer = (title: Title = "新增", row: any = {}) => {
  drawerProps.visible = true;
  drawerProps.title = title;
  drawerProps.formData = { 
    ...row,
   };
};
</script>
<style lang="scss" scoped>
.table-box {
  height: 300px;
}
</style>
