<template>
  <el-tabs v-model="activeName" class="container" @tab-click="handleClick">
    <el-tab-pane label="基础信息" name="first">
      <el-card>
        <template #header>
          <div class="mf-title">基础信息</div>
        </template>
        <el-descriptions>
          <el-descriptions-item label="名称">{{ detail?.roleName }}</el-descriptions-item>
          <el-descriptions-item label="描述">{{ detail?.remark }}</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ detail?.createTime }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card class="box-card table">
        <template #header>
          <div class="flex flx-justify-between">
            <span class="mf-title">权限分配</span>
            <el-button type="primary" v-auth="['save']" class="button" @click="save">保存</el-button>
          </div>
        </template>
        <ProTable
          ref="proTable"
          :columns="columns"
          :request-api="getMenuByRoleId"
          :init-param="initParam"
          :tool-button="false"
          :data-Callback="dataCallback"
          :default-expand-all="true"
        >
          <template #feature="scope">
            <div v-if="scope.row.buttonBodyList && scope.row.buttonBodyList.length > 0">
              <el-checkbox
                v-for="button of scope.row.buttonBodyList"
                :checked="validChecked(button.id, scope.row.buttonViewList)"
                @change="(check: boolean) => featureChange(check, button, scope.row)"
                :key="button.id"
              >
                {{ button.name }}
              </el-checkbox>
            </div>
            <div v-else>--</div>
          </template>
          <template #title="scope">
            <el-checkbox
              @change="(check: boolean) => menuChange(check, scope.row)"
              :disabled="
                checkMenus[scope.row.id] &&
                (checkMenus[scope.row.id].childIsChecked || !!checkMenus[scope.row.id].buttonViewList?.length)
              "
              v-model="checkMenus[scope.row.id].checked"
            >
              {{ scope.row?.meta?.title }}
            </el-checkbox>
          </template>
        </ProTable>
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="用户管理" name="second">
      <div class="card content-box">
        <span class="text">我是 角色 详情页，属于 角色 下面的子集 🍓🍇🍈🍉</span>
        <span class="text">params:{{ route.params }}</span>
        <span class="text">query:{{ route.query }}</span>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts" name="roleDetail">
import { useRoute } from "vue-router";
import { ref, onMounted, reactive } from "vue";
import { getRoleDetail, getMenuByRoleId, saveRolePermission } from "@/api/modules/role";
import { Role, Menus } from "@/api/interface";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import ProTable from "@/components/ProTable/index.vue";
import { ElMessage } from "element-plus";

interface AuthMenu extends Menus.Response {
  isChose: string;
  children?: AuthMenu[];
}

const route = useRoute();
const activeName = ref("first");
const detail = ref<Role.Response>();

// ProTable 实例
const proTable = ref<ProTableInstance>();

const initParam = reactive({ roleId: route.params.id });

const checkMenus = reactive<Record<string, { checked: boolean; childIsChecked?: boolean; buttonViewList?: Menus.ButtonBody[] }>>(
  {}
);

// 表格配置项
const columns = reactive<ColumnProps<AuthMenu>[]>([
  {
    prop: "title",
    label: "菜单权限",
    align: "left"
  },
  {
    prop: "feature",
    label: "功能权限"
  }
]);

function handleClick(e) {
  console.log(e);
}

// 判断checkbox是否被选择
function validChecked(id: string, checkedList?: [{ id: string }]) {
  if (checkedList && checkedList.length > 0) {
    let index = checkedList.findIndex(item => item.id === id);
    return index === -1 ? false : true;
  }
  return false;
}

// 权限功能选择变化
function featureChange(checked: boolean, button: Menus.ButtonBody, row: AuthMenu) {
  if (checked) {
    if (row.id in checkMenus) {
      if (row.parentId) {
        let menu = findMenuByParenId(row.parentId);
        if (menu) {
          checkMenus[row.parentId].childIsChecked = true;
          checkMenus[row.parentId].checked = true;
        }
      }
      if (checkMenus[row.id].buttonViewList) {
        checkMenus[row.id].buttonViewList?.push(button);
      } else {
        checkMenus[row.id].buttonViewList = [button];
      }
      checkMenus[row.id].checked = true;
    } else {
      checkMenus[row.id] = { buttonViewList: [button], checked: true };
    }
  } else {
    if (row.id in checkMenus) {
      let { buttonViewList } = checkMenus[row.id];
      if (!buttonViewList) {
        buttonViewList = [];
      }
      let _button = [...buttonViewList];
      let index = buttonViewList.findIndex(item => item.id === button.id);
      _button.splice(index, 1);
      checkMenus[row.id].buttonViewList = _button;
    }
  }
}

// 权限菜单选择变化
function menuChange(checked: boolean, row: AuthMenu) {
  if (checked) {
    if (row.id in checkMenus) {
      checkMenus[row.id].checked = true;
    } else {
      checkMenus[row.id] = { buttonViewList: row.buttonViewList || [], checked: true };
    }
    if (row.parentId) {
      if (row.parentId in checkMenus) {
        checkMenus[row.parentId].childIsChecked = true;
        checkMenus[row.parentId].checked = true;
      } else {
        checkMenus[row.parentId] = { childIsChecked: true, checked: true };
      }
    }
  } else {
    checkMenus[row.id].checked = false;
    if (row.parentId && row.parentId in checkMenus) {
      checkMenus[row.parentId].childIsChecked = false;
    }
  }
}

function findMenuByParenId(parentId: string) {
  let menu: AuthMenu | undefined;
  function loop(list: AuthMenu[]) {
    menu = list.find(item => {
      if (item.children && item.children.length > 0) {
        loop(item.children);
      }
      return item.id === parentId;
    });
  }
  loop(proTable.value?.tableData as AuthMenu[]);
  return menu;
}

// 获取被选择的菜单
function findCheckMenus(data: AuthMenu[]) {
  function loop(data: AuthMenu[]) {
    for (let i = 0; i < data.length; i++) {
      const item: AuthMenu = data[i];
      checkMenus[item.id] = {
        childIsChecked: false,
        buttonViewList: item.buttonViewList,
        checked: item.isChose === "true" ? true : false
      };
      if (item.parentId && item.isChose === "true") {
        checkMenus[item.parentId].childIsChecked = true;
      }
      if (item.children && item.children.length > 0) {
        loop(item.children);
      }
    }
  }
  loop(data);
}

// 表格数据
function dataCallback(data: AuthMenu[]) {
  findCheckMenus(data);
  return data;
}

// 获取详情信息
async function getDetail() {
  const { data } = await getRoleDetail({ roleId: route.params.id });
  detail.value = data;
}
// 保存权限信息信息
async function save() {
  console.log(checkMenus);
  let permission = Object.keys(checkMenus)
    .filter(key => checkMenus[key].checked)
    .map(key => {
      return {
        menuId: key,
        buttonViewList: checkMenus[key].buttonViewList
      };
    });
  await saveRolePermission({ roleId: route.params.id, permission });
  ElMessage.success({ message: `操作成功！` });
}

onMounted(() => {
  getDetail();
});
</script>

<style lang="scss" scoped>
@import "@/styles/element.scss";

.container {
  height: 100%;
  :deep(.el-tabs__header) {
    @include card;
    padding: 0 20px;
    margin-bottom: 10px;
    .el-tabs__nav-wrap::after {
      height: 0;
    }
  }
}
.box-card {
  margin-top: 10px;
}
.table {
  :deep(.el-card__body) {
    height: calc(100vh - 450px);
  }
}
</style>
