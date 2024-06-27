<template>
  <el-dialog v-model="isVisible" title="选择项目" width="400">
    <el-cascader :modelValue="projectValue" :options="operatableList" @change="handleChange"
      style="width: 320px; margin-top: 20px;" />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import useCurrentProject from '@/stores/modules/currentProject';
import { getOperatableList, editOperatable } from "@/api/modules/menu";
import axios from 'axios';
import { ElMessage } from "element-plus";

const isVisible = ref(true);
const env = localStorage.getItem("env")
const { setProject, projectValue, setProjectValue } = useCurrentProject();
const operatableList = reactive<Array<any>>([])

onMounted(() => {
  if (env === '运维中心') {
    // getOperatableList().then(res => {
    //   const list = res.data.map(v => {
    //     return {
    //       label: v.typeName,
    //       value: v.type,
    //       children: v.children?.map(c => {
    //         return {
    //           label: c.projectName,
    //           value: c.projectId,
    //         }
    //       })
    //     }
    //   })
    //   operatableList.push(...list)
    // })
    // .catch(err => {
    //   console.log('err132',err);
      
    // })

    axios.get('/bsp/rest/auth/homePage/getProjectsGroupByType').then(res => {
      const list = res.data.data.map(v => {
        return {
          label: v.typeName,
          value: v.type,
          children: v.children?.map(c => {
            return {
              label: c.projectName,
              value: c.projectId,
            }
          })
        }
      })
      operatableList.push(...list)
      })
  }
})

const handleChange = (value) => {
  setProjectValue(value)
  console.log('ces value',value);
  
  editOperatable(value[1])
    .then(res => {
      ElMessage.success("操作成功！")
      setProject(res.data)
      isVisible.value = false;
    }).catch(err => {
      console.log(err);
    })
}
</script>
