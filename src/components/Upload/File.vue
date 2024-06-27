<template>
  <div
    class="my-upload"
  >
    <el-button
      @click="handleClick"
      type="primary"
    >
      点击上传
    </el-button>
    <div v-for="(item, i) in fileList" :key="i" class="my-upload-item">
      <div class="my-upload-item-name">
        <el-icon><Document/></el-icon>
        {{ item.name }}
      </div>
      <el-icon @click="del(i)">
        <Delete />
      </el-icon>
    </div>

    <input
      v-show="false"
      ref="inputRef"
      :multiple="false"
      :accept="accept"
      type="file"
      @change="handleChange"
      @click.stop
    />
</div>
</template>
<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'
import { upload } from '@/api/modules/upload'
import { Delete, Document } from '@element-plus/icons-vue'

const fileList:{value:any} = defineModel()

const props = defineProps({
  accept: {
    type: String,
    default: '',
  }
})

const inputRef = ref()

const handleChange = async (e) => {
  const file = e.target.files[0]
  e.target.value = ''

  const formData = new FormData();
  formData.append("file", file);

  const { data } = await upload(formData);
  fileList.value.push({ name: data.fileName, id: data.id })
}

const handleClick = () => {
  inputRef.value.click()
}

const del = (i) => {
  fileList.value.splice(i, 1)
}

</script>

<style scoped>
.my-upload-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 30px);
  margin-left: 4px;
  color: #606266;
  padding: 1px 4px;
  border-radius: 4px;
}
.my-upload-item:hover {
  background-color: #f5f7fa;
}
.my-upload-item-name {
  display: flex;
  align-items: center;
}
</style>