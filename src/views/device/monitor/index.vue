<template>
  <div class="container">
    <div class="leftBox">
      <el-card>
        <el-input>
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
        <div class="letf-icon">
          <el-icon>
            <EditPen />
          </el-icon>
          <el-icon>
            <Delete />
          </el-icon>
          <el-icon>
            <CirclePlus />
          </el-icon>
          <el-icon>
            <SortDown />
          </el-icon>
          <el-icon>
            <SortUp />
          </el-icon>
        </div>
      </el-card>
    </div>
    <div class="rightBox">
      <el-card class="rightAbove-card">
        <el-form :model="form" label-width="auto" style="max-width: 500px">
          <el-form-item label="更新时间">
            <!-- <el-col :span="11">
              <el-date-picker type="date" v-model="form.startTime" placeholder="开始时间" style="width: 100%" />
            </el-col>
            <span style="margin: 0 10px;">-</span>
            <el-col :span="11">
              <el-date-picker type="date" v-model="form.endTime" placeholder="结束时间" style="width: 100%" />
            </el-col> -->
            <el-date-picker
              v-model="form.time"
              type="daterange"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item label="选择设备">
            <el-radio-group v-model="seldevice">
              <el-radio label="全部" value='0' />
              <el-radio label="带云台" value="1" />
              <el-radio label="不带云台" value="2" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="设备类型">
            <el-radio-group v-model="deviceType">
              <el-radio label="全部" value='0' />
              <el-radio label="枪机" value="1" />
              <el-radio label="球机" value="2" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="设备用途">
            <el-radio-group v-model="form.deviceUser">
              <el-radio label="全部" value='0' />
              <el-radio label="监控" value="1" />
              <el-radio label="一键呼救" value="2" />
              <el-radio label="人脸识别" value="3" />
              <el-radio label="车牌识别" value="4" />
              <el-radio label="人流监控" value="5" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="设备状态">
            <el-radio-group v-model="form.status">
              <el-radio label="全部" value="3" />
              <el-radio label="在线" value="1" />
              <el-radio label="离线" value="0" />
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="rightBelow-card">
        <div class="table-operate">
          <div>
            <el-button type="primary">迁移</el-button>
            <el-button type="primary">新增设备</el-button>
            <el-button>刷新</el-button>
            <el-button type="primary">导出</el-button>
          </div>
          <div style="display: flex;">
            <div style="margin-right: 10px">
              <el-input v-model="form.searchText" placeholder="请输入设备名称或点位名称">
                <template #append>
                  <el-button type="primary">搜索</el-button>
                </template>
              </el-input>
            </div>
            <div>
              <el-radio-group v-model="tabSwitch">
                <el-radio-button label="列表" value="list" />
                <el-radio-button label="缩略图" value="picture" />
              </el-radio-group>
            </div>
          </div>
        </div>
        <div v-if="tabSwitch === 'list'" class="card-list">
          <el-table :data="detail" style="width: 100%">
            <el-table-column prop="cameraName" label="名称" />
            <el-table-column prop="deviceType" label="设备类型"  />
            <el-table-column prop="deviceUser" label="设备用途" width="180" >
             <template #default="scope">
              {{ deviceUser[scope.row.deviceUser ]}}
             </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
              <template #default="scope">
                <div v-if="scope.row.status === '0'">
                  <span class="circle-red"></span>
                  <span>离线</span>
                </div>
                <div v-if="scope.row.status === '1'">
                  <span class="circle-green"></span>
                  <span>在线</span>
                </div>
             </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="180" />
            <el-table-column label="操作" width="150">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="toDetail(scope.row.id)">
                  详情
                </el-button>
                <el-button link type="primary" size="small">编辑</el-button>
                <el-button link type="primary" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div v-if="tabSwitch === 'picture'" class="card-picture">
          <div v-for="data in detail" class="card-item" :key="data" :label="data">
            <img :src=data.imgUrl  width="100%" @click="toDetail(data.id)">
            <div class="item-info">
              <div class="item-name">{{ data.cameraName }}</div>
              <div class="item-type">类型：{{ data.deviceType }}</div>
            </div>
            <div class="button-area">
              <el-button :icon="EditPen"></el-button>
              <el-button :icon="Delete"></el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, EditPen, Delete, CirclePlus, SortDown, SortUp } from '@element-plus/icons-vue'
import { ref, watch } from 'vue';
import { getCamera } from '@/api/modules/monitor';
import { useRouter } from 'vue-router';
const  seldevice = ref('0')
const deviceType = ref('0')

const form = ref({
  // startTime: '',
  // endTime: '',
  time: ['', ''],
  deviceUser: '0',
  status: '3',
  searchText: '',
});

const deviceUser ={
  1: '监控',
  2: '一键呼叫',
  3: '人脸识别',
  4: '车牌识别',
  5: '人流监控',
}
const tabSwitch = ref('picture');
const router = useRouter()
const detail = ref();


watch(
  form,
  (newForm) => {
    const params: any = {
      ...newForm,
      deviceUser: newForm.deviceUser === '0' ? undefined : newForm.deviceUser,
      status: newForm.status === '3' ? undefined : newForm.status
    }

    if (newForm.time[0]) {
      params.startTime = newForm.time[0]
      params.endTime = newForm.time[1]
    }

    getCamera(params).then(res => {
      detail.value = res.data;
    })
  },
  { immediate: true, deep: true }
)

const toDetail = (id: string) => {
  router.push(`/device/monitor/detail/${id}`)
}

</script>

<style scoped lang="scss">
.button-area {
  display: flex;
  justify-content: space-around;
}

.container {
  display: flex;
  width: 100%;
}

.leftBox {
  width: 20%;
  margin-right: 10px;
}

.letf-icon {
  padding: 15px 0;
  color: #999999;
  cursor: pointer;

  :nth-child(n+2) {
    margin-left: 50px;
  }
}

.rightAbove-card {
  height: 240px;
  padding: 5px;
}

.el-form-item--default {
  margin-bottom: 10px;
}

.rightBelow-card {
  height: 500px;
  margin-top: 10px;
  padding: 5px;
}

.rightBox {
  width: 80%;
}

.table-operate {
  display: flex;
  justify-content: space-between;
}

.card-list {
  margin: 20px 0;
}

.card-picture {
  display: flex;
  flex-wrap: wrap;
  height: 450px;
  overflow-y: scroll;
  margin: 20px 0;
}

.card-item {
  width: 280px;
  // height: 250px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  margin-right: 10px;

  padding-bottom: 12px;

  &:hover {
    cursor: pointer;
  }
}

.item-info {
  margin: 5px 10px;
}

.item-name {
  font-weight: 500;
  font-size: 17px;
  color: #606266;
  margin: 10px 0;
}

.item-type {
  font-size: 14px;
  margin-bottom: 10px;
  color: #999999
}
.el-radio-group{
  flex-wrap:nowrap
}
::v-deep .circle-green {
    width: 8px;
    height: 8px;
    display: inline-block;
    background-color: #52c41a;
    border-radius: 50%;
    margin-right: 5px;
  }
  ::v-deep .circle-red {
    width: 8px;
    height: 8px;
    display: inline-block;
    background-color: red;
    border-radius: 50%;
    margin-right: 5px;
  }
</style>