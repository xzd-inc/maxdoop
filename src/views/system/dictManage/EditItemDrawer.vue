<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}字典详情`">
    <el-form ref="formRef" label-width="100px" label-suffix=" :" :rules="rules" :model="drawerProps.row">
      <el-form-item label="标签" prop="label">
        <el-input v-model="drawerProps.row!.label" placeholder="请填写标签" clearable></el-input>
      </el-form-item>
      <el-form-item label="值" prop="value">
        <el-input v-model="drawerProps.row!.value" placeholder="请填写值" clearable></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number
          :controls="false"
          class="number-input"
          v-model="drawerProps.row!.sort"
          placeholder="请填写顺序号"
          clearable
        ></el-input-number>
      </el-form-item>
      <el-form-item label="说明" prop="remark">
        <el-input v-model="drawerProps.row!.remark" placeholder="请填写说明" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { Dict } from "@/api/interface";

const rules = reactive({
  label: [{ required: true, message: "请填写标签" }],
  value: [{ required: true, message: "请填值" }]
});

interface DrawerProps {
  title: string;
  row: Partial<Dict.DictItem>;
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
const formRef = ref<FormInstance>();
const handleSubmit = () => {
  console.log(drawerProps.value);
  formRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await drawerProps.value.api!(drawerProps.value.row);
      ElMessage.success({ message: `${drawerProps.value.title}字典详情成功！` });
      drawerProps.value.refresh!();
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

defineExpose({
  acceptParams
});
</script>

<style scoped lang="scss">
.number-input {
  width: 100%;
  :deep(.el-input__inner) {
    text-align: left;
  }
}
</style>
