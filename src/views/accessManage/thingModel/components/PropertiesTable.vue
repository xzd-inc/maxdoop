<template>
  <div class="table-box wrapper">
    <ProTable
      ref="proTable"
      :columns="columns"
      :request-api="getThingModelPropsNopage"
      :init-param="initParam"
      :tool-button="['refresh']"
      :pagination="false"
    >
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增属性</el-button>
      </template>
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDialog(scope.row)">查看</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button type="primary" link :icon="Delete" @click="del(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <el-drawer v-model="drawerProps.visible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}属性`">
      <PropertiesForm ref="formRef" v-model="drawerProps.formData" />
      <template #footer>
        <el-button @click="drawerProps.visible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-drawer>
  </div>
  <PropertiesDetail ref="dialogRef"/>
</template>

<script setup lang="tsx" name="thingModelList">
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { ThingModel } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import {
  getThingModelPropsNopage,
  addThingModelProps,
  editThingModelProps,
  deleteThingModelProps
} from "@/api/modules/thingModel";
import PropertiesForm from "./PropertiesForm.vue";
import { ElMessage } from "element-plus";
import PropertiesDetail from "./PropertiesDetail.vue"

type Title = "新增" | "编辑";
interface DrawerProps {
  title: Title;
  visible: boolean;
  formData: ThingModel.Properties;
}

const proTable = ref<ProTableInstance>();
const route = useRoute();
const dialogRef = ref<any>();

interface Props {
  name?: string;
  modelId?:any;
}

const openDialog = (row: any, ) => {
  dialogRef.value.show(row);
}

const props = defineProps<Props>()

const initParam = reactive({ modelId: route.params.id as string });
const drawerProps = reactive<DrawerProps>({
  title: "新增",
  visible: false,
  formData: {
    type: "int"
  }
});
const formRef = ref<InstanceType<typeof PropertiesForm>>();

const columns = reactive<ColumnProps<ThingModel.Properties>[]>([
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

const del = async (params: ThingModel.Properties) => {
  await useHandleData(deleteThingModelProps, [params.id], `删除【${params.name}】属性`);
  proTable.value?.getTableList();
};

async function add() {
  await addThingModelProps({ modelId: route.params.id as string, ...drawerProps.formData });
}

async function edit() {
  await editThingModelProps({ modelId: route.params.id as string, ...drawerProps.formData });
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
      ElMessage.success({ message: `${drawerProps.title}属性成功！` });
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
  drawerProps.formData = { ...row };
};
</script>
<style lang="scss" scoped>
.wrapper {
  height: 300px;
}
</style>
