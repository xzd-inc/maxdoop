<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      :columns="columns"
      :request-api="getProductListApi"
      :init-param="initParam"
      :tool-button="['refresh']"
    >
      <template #tableHeader>
        <el-button type="primary" v-auth="'add'" :icon="CirclePlus" @click="openDrawer('新增')">新增产品</el-button>
      </template>
      <template #avatar="scope">
        <el-image
          shape="square"
          :preview-src-list="[`data:image/png;base64,${scope.row.photoUrl}`]"
          style="width: 60px"
          :src="`data:image/png;base64,${scope.row.photoUrl}`"
          preview-teleported
        />
      </template>
      <template #operation="scope">
        <el-button v-auth="'view'" type="primary" link :icon="View" @click="toDetail(scope.row.id)">详情</el-button>
        <el-button v-auth="'edit'" type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button v-auth="'delete'" type="primary" link :icon="Delete" @click="deleteProduct(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <EditDrawer ref="drawerRef" />
  </div>
</template>

<script setup lang="tsx" name="product">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { Product } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import EditDrawer from "./components/EditDrawer.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import { editProduct, deleteProductApi, getProductListApi, addProduct, editProductStatus, getProductDetailApi } from "@/api/modules/product";
import { deviceType } from "@/utils/dict";
import { useHasAuth } from "@/hooks/useHasAuth";

const hasAuth = useHasAuth(["edit", "delete", "view"]);
const canEditStatus = useHasAuth(["editStatus"]);

const router = useRouter();

// 跳转详情页
const toDetail = (id: string) => {
  router.push(`/deviceManage/product/detail/${id}`);
};

const proTable = ref<ProTableInstance>();

const initParam = reactive({});

// 表格配置项
const columns = reactive<ColumnProps<Product.Response>[]>([
  {
    prop: "searchText",
    label: "搜索",
    isShow: false,
    search: { el: "input", tooltip: "输入名字搜索" }
  },
  // {
  //   prop: "avatar",
  //   label: "图片"
  // },
  {
    prop: "id",
    label: "Id"
  },
  {
    prop: "name",
    label: "名称"
  },
  {
    prop: "networkType",
    label: "设备类型",
    enum: deviceType
  },
  // {
  //   prop: "status",
  //   label: "状态",
  //   render: scope => {
  //     return (
  //       <el-switch
  //         disabled={!canEditStatus}
  //         type="primary"
  //         v-model={scope.row.status}
  //         before-change={() => changeState(scope.row)}
  //         inline-prompt
  //         active-text="启用"
  //         inactive-text="禁用"
  //         active-value="1"
  //         inactive-value="0"
  //       ></el-switch>
  //     );
  //   }
  // },
  { prop: "operation", label: "操作", fixed: "right", isShow: hasAuth, width: 260 }
]);

// 删除产品信息
const deleteProduct = async (params: Product.Response) => {
  await useHandleData(deleteProductApi, [params.id], `删除【${params.name}】产品`);
  proTable.value?.getTableList();
};

// 修改状态
async function changeState(row: Product.Response) {
  console.log(row);
  await useHandleData(editProductStatus, { id: row.id }, `设置【${row.name}】状态`);
  proTable.value?.getTableList();
  return false;
}

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof EditDrawer> | null>(null);
const openDrawer = async (title: string, row?: Partial<Product.Response>) => {
  const params = {
    title,
    row: row
      ? await getProductDetailApi({ id: row.id }).then(res => ({ ...res.data, attachmentIds: res.data.attachmentIds || [] }))
      : { attachmentIds: [] }, 
    imageUrl: row?.photoUrl,
    api: title === "新增" ? addProduct : editProduct,
    refresh: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};
</script>
