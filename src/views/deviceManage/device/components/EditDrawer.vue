<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}设备`">
    <el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :rules="rules" :model="drawerProps.row">
      <el-form-item label="名称" prop="deviceName">
        <el-input v-model="drawerProps.row!.deviceName" placeholder="请填写名称" clearable></el-input>
      </el-form-item>
        <el-form-item label="唯一标识" prop="identifier">
        <el-input v-model="drawerProps.row!.identifier" placeholder="设备在产品中的唯一标识" clearable></el-input>
      </el-form-item>
      <el-form-item label="产品" prop="productId">
        <el-select v-model="drawerProps.row!.productId" >
          <el-option v-for="item in productList" :key="item.id" :label="item.label" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="关联网关" prop="parentDeviceId" v-if="selectedProduct?.networkType === '3'">
        <RequestSelect v-model="drawerProps.row!.parentDeviceId" :api="() => getAdvice({ productId: selectedProduct.fatherId })" label="deviceName"/>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="drawerProps.row!.remark" placeholder="请填写描述" clearable></el-input>
      </el-form-item>
   
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="deviceDrawer">
import { ref, reactive, onMounted, computed } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { Device } from "@/api/interface";
import RequestSelect from "@/components/RequestSelect/index.vue";
import { getProductNopage } from "@/api/modules/product";
import { getAdvice } from "@/api/modules/device";
import { networkType } from "@/utils/dict";

const productList = ref<any[]>([]);

onMounted(() => {
  getProductNopage().then(res => {
    productList.value = res.data.map(v => ({ ...v, label: v.name }))
  })
})  

const selectedProduct = computed(() => {
  return productList.value.find(v => v.id === drawerProps.value.row!.productId )
})

interface DrawerProps {
  title: string;
  row: Partial<Device.Response>;
  api?: (params: any) => Promise<any>;
  refresh?: () => void;
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  title: "",
  row: {}
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params;
  drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  console.log(drawerProps.value);
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await drawerProps.value.api!(drawerProps.value.row);
      ElMessage.success({ message: `${drawerProps.value.title}设备成功！` });
      drawerProps.value.refresh!();
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

const rules = reactive({
  identifier: [{ required: true, message: "设备在产品中的唯一标识" }],
  deviceName: [{ required: true, message: "请填写设备名称" }],
  productId: [{ required: true, message: "请选择产品" }],
  parentDeviceId: [{ required: true, message: "请选择" }]
});

defineExpose({
  acceptParams
});
</script>

<style>
.icon {
  vertical-align: middle;
  font-size: 24px;
}
.upload {
  width: 100%;
}
</style>
