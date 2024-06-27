<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="600px" :title="`${drawerProps.title}项目`">
    <el-form ref="ruleFormRef" label-width="100px" label-suffix=" :" :rules="rules" :model="drawerProps.row">
      <el-form-item label="项目名称" prop="projectName">
        <el-input v-model="drawerProps.row!.projectName" placeholder="请填写项目名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="说明" prop="description">
        <el-input v-model="drawerProps.row!.description" placeholder="请填写项目说明" clearable></el-input>
      </el-form-item>
      <el-form-item label="系统类型" prop="type">
        <el-select v-model="drawerProps.row!.type" placeholder="请填写项目说明" clearable>
          <el-option v-for="item in systemType" :label="item.label" :value="item.value" :key="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="项目菜单" prop="menusIds">
        <el-tree
          ref="treeRef"
          :data="menusTreeData"
          show-checkbox
          default-expand-all
          check-strictly
          :default-checked-keys="checkedKeys"
          node-key="code"
          :props="menusTreeProps"
          @check="checkChange"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="projectDrawer">
import { ref, reactive, onMounted } from "vue";
import { ElMessage, FormInstance, TreeInstance } from "element-plus";
import { Project, Menus } from "@/api/interface";
import { getMenusTreeApi } from "@/api/modules/menus";
import { getCodeByProjectId } from "@/api/modules/project";
import { watch } from "vue";
import { systemType } from '@/utils/dict';

const rules = reactive({
  projectName: [{ required: true, message: "请填写项目名称" }]
});

const treeRef = ref<TreeInstance>();

interface DrawerProps {
  title: string;
  row: Partial<Project.EditParams>;
  api?: (params: any) => Promise<any>;
  refresh?: () => void;
}

const menusTreeProps = reactive({
  label: (data: Menus.Response) => data.meta.title
});

const checkedKeys = ref<string[]>();
const menusTreeData = ref<Menus.Response[]>();
const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  title: "",
  row: {}
});

// 获取codes
function findParentCode(id: string) {
  let codes: string[] = [];
  function loop(list: Menus.Response[], _codes: string[]) {
    let _tempCodes: string[] = [];
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (item.id === id) {
        return [..._codes, item.code];
      }
      if (item.children) {
        _tempCodes = loop(item.children, [..._codes, item.code]);
        if (_tempCodes && _tempCodes.length > 0) {
          return _tempCodes;
        }
      }
    }
    return _tempCodes;
  }
  if (menusTreeData.value) {
    codes = loop(menusTreeData.value, []);
  }
  return codes;
}

// 选中树节点变化
function checkChange(current: Menus.Response, checks) {
  const { checkedKeys } = checks;
  if (checkedKeys.some((key: string) => key === current.code) && current.parentId) {
    treeRef.value?.setCheckedKeys([...findParentCode(current.parentId), ...checkedKeys]);
  }
  drawerProps.value.row.codes = treeRef.value?.getCheckedKeys() as string[];
}

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
      ElMessage.success({ message: `${drawerProps.value.title}项目成功！` });
      drawerProps.value.refresh!();
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

async function getMenusTree() {
  const { data: menus } = await getMenusTreeApi();
  menusTreeData.value = menus;
}

async function getChecksKeysOfMenus() {
  checkedKeys.value = [];
  if (!drawerProps.value.row.id) return;
  const { data } = await getCodeByProjectId({ projectId: drawerProps.value.row.projectId });
  checkedKeys.value = data;
}

onMounted(() => {
  getMenusTree();
  getChecksKeysOfMenus();
});

watch(drawerProps, getChecksKeysOfMenus);

defineExpose({
  acceptParams
});
</script>

<style>
.icon {
  vertical-align: middle;
  font-size: 24px;
}
</style>
