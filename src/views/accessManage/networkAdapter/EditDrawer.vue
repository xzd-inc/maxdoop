<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}适配器`">
    <el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :rules="rules" :model="drawerProps.row">
      <el-form-item label="名称" prop="networkName">
        <el-input v-model="drawerProps.row!.networkName" placeholder="请填写名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="附件" prop="attachmentIds">
        <UploadFile v-model="drawerProps.row!.attachmentIds" />
      </el-form-item>
      <el-form-item label="类型" prop="protocolType">
        <el-select v-model="drawerProps.row!.protocolType" placeholder="请选择类型">
          <el-option v-for="item in networkType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="产品" prop="productId">
        <RequestSelect
          placeholder="请选择产品"
          v-model="drawerProps.row!.productId"
          :api="() => getProductList()"
          label="name"
        />
      </el-form-item>
      <el-form-item label="协议" prop="protocolId">
          <RequestSelect placeholder="请选择协议" v-model="drawerProps.row!.protocolId" :api="getProtocolNopage"
            label="protocolName" />
        </el-form-item>
      <div v-if="drawerProps.row!.protocolType === '1' || drawerProps.row!.protocolType === '2'">
        <el-form-item label="端口" prop="port">
          <el-input-number placeholder="请输入端口" v-model="drawerProps.row!.port" :controls="false" style="width:100%"/>
        </el-form-item>
        <el-form-item label="地址" prop="broker">
          <el-input v-model="drawerProps.row!.broker" placeholder="请填写地址" clearable></el-input>
        </el-form-item>
      </div>
      <div v-if="drawerProps.row!.protocolType === '4'">
        <el-form-item label="地址" prop="broker">
          <el-input v-model="drawerProps.row!.broker" placeholder="请填写地址" clearable></el-input>
        </el-form-item>
        <el-form-item label="端口" prop="port">
          <el-input-number v-model="drawerProps.row!.port" placeholder="请填写端口" clearable :controls="false" style="width:100%"></el-input-number>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="drawerProps.row!.username" placeholder="请填写用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="drawerProps.row!.password" placeholder="请填写密码" clearable></el-input>
        </el-form-item>
        <el-form-item label="证书" prop="certificateIds">
          <UploadFile v-model="drawerProps.row!.certificateIds" />
        </el-form-item>
        <el-form-item label="主题" prop="topic">
          <div v-for="(k, i) in drawerProps.row.topic" :key="i">
            <el-input
              v-model="(drawerProps.row as any).topic[i]"
              placeholder="请填写主题"
              clearable
              style="width: 430px; margin: 8px 0"
            ></el-input>
            <el-icon 
              v-if="i"
              @click="delItem(i)"
              style="color: red; cursor: pointer; margin-left: 5px;">
              <Delete />
            </el-icon>
          </div>
          <div>
            <el-button class="inputAdd" @click="addItem()">+</el-button>
          </div>
        </el-form-item>
      </div>

      <!-- <div v-if="drawerProps.row!.protocolType === '5'">
        <el-form-item label="协议">
          <RequestSelect placeholder="请选择协议" v-model="drawerProps.row!.protocolId" :api="getProtocolNopage"
            label="protocolName" />
        </el-form-item>
        <el-form-item label="说明">
          <el-input type="textarea" v-model="drawerProps.row!.remark" placeholder="请填写说明" clearable></el-input>
        </el-form-item>
      </div> -->
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="adapterDrawer">
import { ref, reactive, watch } from "vue";
import { ElMessage, FormInstance, genFileId } from "element-plus";
import type { UploadProps, UploadRawFile } from "element-plus";
import { Adapter } from "@/api/interface";
import { networkType } from "@/utils/dict";
import RequestSelect from "@/components/RequestSelect/index.vue";
import { getProtocolNopage } from "@/api/modules/protocol";
import { getProductList } from "@/api/modules/product";
import UploadFile from '@/components/Upload/File.vue'

interface DrawerProps {
  title: string;
  row: Partial<Adapter.Response & { networkTypes: string }>;
  api?: (params: any) => Promise<any>;
  refresh?: () => void;
}

const fileList = ref();
const upload = ref();
const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  title: "",
  row: { networkTypes: '0' }
});

const rules = reactive({
  networkName: [{ required: true, message: "请填写适配器名称" }],
  protocolType: [{ required: true, message: "请选择类型" }],
  networkTypes: [{ required: true, message: "必选" }],
  broker: [{ required: true, message: "请填写地址" }],
  port: [{ required: true, message: "请填写端口" }],
  username: [{ required: true, message: "请填写" }],
  password: [{ required: true, message: "请填写" }],
  cacert: [{ required: true, message: "请填写" }],
  topic: [{ required: true, message: "请填写主题" }],
  protocolId: [{ required: true, message: "请选择" }],
  productId: [{ required: true, message: "请选择" }]
});

const addItem = () => {
  if (!drawerProps.value.row.topic) {
    drawerProps.value.row.topic = []
  }
  drawerProps.value.row.topic.push('')
}

const delItem = (i) => {
  // @ts-expect-error
  drawerProps.value.row.topic.splice(i, 1)
}

const handleExceed: UploadProps["onExceed"] = files => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
}

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params;
  drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      const { row } = drawerProps.value;
      const params = {
        ...row,
        attachmentIds: row.attachmentIds?.map(v => v.id),
        certificateIds: row.certificateIds?.map(v => v.id),
        configuration: {
          broker: row.broker,
          port: row.port,
          username: row.username,
          password: row.password,
          topic: row.topic
        }
      }

      await drawerProps.value.api!(params);
      ElMessage.success({ message: `${drawerProps.value.title}适配器成功！` });
      drawerVisible.value = false;
      // @ts-expect-error
      drawerProps.value.refresh();
    } catch (error) {
      console.log(error);
    }
  });
};

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
.el-input-number .el-input__inner{
  text-align: left;
}
</style>
