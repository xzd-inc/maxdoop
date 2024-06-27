<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}产品`">
    <el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :rules="rules" :model="drawerProps.row">
      <el-form-item label="名称" prop="name">
        <el-input v-model="drawerProps.row!.name" placeholder="请填写名称" clearable></el-input>
      </el-form-item>
      <!-- <el-form-item label="分类" prop="productType">
        <el-select v-model="drawerProps.row!.name" placeholder="请选择分类">
          <el-option v-for="product in productType" :key="product.value" :value="product.value" :label="product.label" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="物模型" prop="thingId">
        <RequestSelect
          placeholder="请选择物模型"
          v-model="drawerProps.row!.thingId"
          :api="getThingModelnoSelectQueryList"
          label="modelName"
        />
      </el-form-item>
      <el-form-item label="设备类型" prop="networkType">
        <el-select v-model="drawerProps.row!.networkType" placeholder="请选择设备类型">
          <el-option v-for="device in deviceType" :key="device.value" :value="device.value" :label="device.label" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="drawerProps.row!.networkType === '3'" label="关联产品" prop="fatherId">
        <RequestSelect placeholder="请选择关联产品" v-model="drawerProps.row!.fatherId" :api="getProductNopage" label="name" />
      </el-form-item>
      <el-form-item label="标识范围" prop="idType">
        <el-select v-model="drawerProps.row!.idType" placeholder="请选择设备类型">
          <el-option v-for="device in idType" :key="device.value" :value="device.value" :label="device.label" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item v-else label="网络组件" prop="netComponentIds">
        <RequestSelect
          placeholder="请选择网络组件"
          v-model="drawerProps.row!.netComponentIds"
          :api="getAdapterNopageList"
          label="networkName"
          multiple 
        />
      </el-form-item> -->
      <!-- <el-form-item label="图片">
        <el-upload 
            class="avatar-uploader" 
            action="#" :auto-upload="false" 
            :show-file-list="false" 
            :on-change="handleChange">
          <img v-if="drawerProps.imageUrl" :src="drawerProps.imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item> -->
      <el-form-item label="图片" prop="attachmentIds">
        <UploadFile v-model="drawerProps.row!.attachmentIds" accept=".jpg,.png"/>
      </el-form-item>
      <el-form-item label="说明" prop="remark">
        <el-input type="textarea" v-model="drawerProps.row!.remark" placeholder="请填写说明" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="productDrawer">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance, UploadInstance, UploadProps, UploadRawFile, genFileId } from "element-plus";
import { Product, Upload } from "@/api/interface";
import RequestSelect from "@/components/RequestSelect/index.vue";
import { getAdapterNopageList } from "@/api/modules/adapter";
import { getProductNopage } from "@/api/modules/product";
import { getThingModelNopage, getThingModelnoSelectQueryList } from "@/api/modules/thingModel";
import { deviceType, idType } from "@/utils/dict";
import UploadFile from '@/components/Upload/File.vue'

interface DrawerProps {
  title: string;
  row: Partial<Product.Response>;
  imageUrl?: string;
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
  if (params.imageUrl) {
    drawerProps.value.imageUrl = `data:image/png;base64,${params.imageUrl}`;
  }
  drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) {
      return;
    }
    try {
      const { row } = drawerProps.value
      const params = {
        ...row,
        attachmentIds: row?.attachmentIds?.map(v => v.id),
      }
      await drawerProps.value.api!(params);  
      ElMessage.success({ message: `${drawerProps.value.title}产品成功！` });
      drawerProps.value.refresh!();
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

const rules = reactive({
  name: [{ required: true, message: "请填写产品名称" }],
  type: [{ required: true, message: "请输入文件类型" }],
  networkType: [{ required: true, message: "请选择" }],
  thingId: [{ required: true, message: "请选择物模型" }],
  idType: [{ required:true, message: "请选择" }]
});

const handleChange = uploadFile => {
  drawerProps.value.imageUrl = URL.createObjectURL(uploadFile.raw!);
  drawerProps.value.row.file = uploadFile.raw;
};

defineExpose({
  acceptParams,
});
</script>

<style scoped>
.icon {
  vertical-align: middle;
  font-size: 24px;
}
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.avatar-uploader {
  & :deep(.el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  & :deep(.el-upload:hover) {
    border-color: var(--el-color-primary);
  }
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
