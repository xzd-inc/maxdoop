<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}触发器`">
    <el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :rules="rules" :model="form">
      <div style="display: flex;">
        <el-form-item label="触发源" prop="product">
          <el-select v-model="form!.product" placeholder="请选择产品" style="width: 220px;">
            <el-option v-for="item in productList" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item prop="executor_target" label-width="0">
          <el-select v-model="form!.executor_target" placeholder="请选择设备" style="width: 220px; margin-left: 10px" multiple>
            <el-option v-for="item in deviceList" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="触发类型" prop="triggerType">
        <el-select v-model="form!.triggerType" placeholder="请选择触发类型">
          <el-option v-for="device in triggerType" :key="device.value" :value="device.value" :label="device.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="说明" prop="triggerRemark">
        <el-input v-model="form!.triggerRemark" placeholder="请填写说明"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" >
import { ref, reactive, onMounted, watch } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { ruleEngine } from "@/api/interface";
import { triggerType } from '@/utils/dict';
import { getProduct, getAdvice, addTrigger } from '@/api/modules/ruleEngine'
import { useRoute } from "vue-router"
const route = useRoute()

const productList = ref<any[]>([]);
const deviceList = ref<any[]>([])

const rules = reactive({
  product: [{ required: true, message: "请选择对象" }],
  executor_target: [{ required: true, message: "请选择设备" }],
  triggerType: [{ required: true, message: "请选择触发方式" }]
});

const form = reactive({
  product: '',
  executor_target: [] as any[],
  triggerType: '',
  triggerRemark: ''
})

onMounted(() => {
  getProduct().then(res => {
    productList.value = res.data.map(v => ({ ...v, label: v.name, value: v.id }))
  })
})

watch(
  () => form.product,
  (newProduct) => {
    form.executor_target = []

    getAdvice(newProduct).then(res => {
      deviceList.value = res.data.map(v => ({ ...v, label:v.deviceName, value:v.id }))
    })
  }
)

interface DrawerProps {
  title: string;
  row: Partial<ruleEngine.linkage>;
  api?: (params: any) => Promise<any>;
  refresh?: () => void;
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  title: "编辑",
  row: {},
  refresh: () => {}
});

const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  console.log(drawerProps.value);
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      const params = {
        id: route.params.id,
        triggerType: form.triggerType,
        triggerRemark:form.triggerRemark,
        triggerConfig: {
          target_id: form.executor_target,
        }
      }
      await addTrigger(params);
      ElMessage.success({ message: `${drawerProps.value.title}成功！` });
      drawerProps.value.refresh!();
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

defineExpose({
  openTrigger(params?: any) {
    drawerVisible.value = true
    drawerProps.value = params
  }
});

</script>

<style scoped>
.icon {
  vertical-align: middle;
  font-size: 24px;
}
</style>
