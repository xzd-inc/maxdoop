<template>
  <div class="box">
    <div v-for="item in sourceData" :key="item.name">
      <el-checkbox
        v-model="checkedPermission[item.identification].checked"
        :label="item.name"
        :key="item.name"
        style="color: var(--el-color-primary)"
        :disabled="checkedPermission[item.identification].actions.length > 0"
      />
      <div class="group">
        <el-checkbox-group
          v-model="checkedPermission[item.identification].actions"
          @change="(checked: boolean) => handleChange(checked, item.identification)"
        >
          <el-checkbox v-for="p in item.actionBodyList" :label="p.action" :key="p.action"> {{ p.name }} </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Premission">
import { ref, onBeforeMount, defineModel, reactive, watch, toRaw } from "vue";
import { getAllPermissionOfEnabledApi } from "@/api/modules/permission";
import { Permission } from "@/api/interface";

interface PermissionBodyList {
  permission: string;
  actions: string[];
}

const model = defineModel<PermissionBodyList[]>();

const checkedPermission = reactive<Record<string, { checked: boolean; actions: string[] }>>({});

const sourceData = ref<Permission.Response[]>();

function handleChange(checked: boolean, key: string) {
  if (checked) {
    checkedPermission[key].checked = true;
  }
}

// 获取已经启用的权限
const getAllPermissionOfEnabled = async () => {
  const { data } = await getAllPermissionOfEnabledApi();
  sourceData.value = data;
  data.forEach(item => {
    if (model.value && model.value.length > 0) {
      let _data = model.value.find(m => m.permission === item.identification);
      if (_data) {
        checkedPermission[item.identification] = { checked: true, actions: _data.actions || [] };
      } else {
        checkedPermission[item.identification] = { checked: false, actions: [] };
      }
    } else {
      checkedPermission[item.identification] = { checked: false, actions: [] };
    }
  });
};

watch(checkedPermission, value => {
  let data: PermissionBodyList[] = Object.keys(value)
    .filter(key => value[key].checked)
    .map(key => {
      return {
        permission: key,
        actions: toRaw(value[key].actions)
      };
    });
  model.value = data;
});

onBeforeMount(() => {
  getAllPermissionOfEnabled();
});
</script>
<style scoped lang="scss">
.box {
  width: 100%;
}
.group {
  padding-left: 24px;
  border-top: 1px solid #eee;
}
</style>
