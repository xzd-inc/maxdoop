<template>
  <el-drawer v-model="drawerVisible" title="编辑定时器" size="600"> 
    <el-tabs type="card">
      <el-tab-pane label="按周">
        <div class="top-box">
          <div class="tab-pane-box" v-for="item in items" :key="item.title" :name="item.title">
            <div class="tab-pane-square">{{ item.title }}</div>
          </div>
        </div>
        <el-form>
          <el-form-item label="执行频率" prop="time">
            <el-select v-model="value"placeholder="周期执行">
              <el-option 
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
            </el-select>
          </el-form-item>
          <div class="dataPicker">
            <el-time-picker
              is-range
              range-separator="-"
              style="max-width: 200px"
            />
            <div>
              <span style="margin: 0 10px;">每</span> 
              <el-input  v-model="input" style="max-width: 150px; margin-right: 5px">
                <template #append>
                  <el-select v-model="select" placeholder="分钟" style="width: 80px">
                    <el-option label="秒" value="0" />
                    <el-option label="分钟" value="1" />
                    <el-option label="小时" value="2" />
                  </el-select>
                </template>
              </el-input>
              执行一次
            </div>
          </div>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="按月">
        <div class="top-box">
          <div class="tab-pane-box" v-for="item in month" :key="item.day" :name="item.day">
            <div class="tab-pane-square"> {{ item.day }}</div>
          </div>
        </div>
        <el-form-item label="执行频率" prop="time">
            <el-select v-model="value"placeholder="周期执行">
              <el-option 
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
            </el-select>
          </el-form-item>
          <div class="dataPicker">
            <el-time-picker v-model="dataPickerValue" placeholder="请选择时间" />
            <div>执行一次</div>
          </div>
      </el-tab-pane>
      <el-tab-pane label="cron表达式">
        <el-form-item label="表达式" prop="time">
            <el-input v-model="value"placeholder="请输入">
            </el-input>
          </el-form-item>
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <el-button  @click="drawerVisible = false">取消</el-button>
      <el-button type="primary">确认</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" >
  import { ref, reactive } from 'vue';
  import { ruleEngine } from '@/api/interface';

  const drawerVisible = ref(false);
  const value = ref('')
  const input = ref('')
  const select = ref('')
  const dataPickerValue = ref('')

  const options =[
    { value: 1, label:"周期执行" },
    { value: 2, label:"执行一次" }
  ]
  const items = [
    { title: "每天", num: 0 },
    { title: "星期一", num: 1 },
    { title: "星期二", num: 2 },
    { title: "星期三", num: 3 },
    { title: "星期四", num: 0 },
    { title: "星期五", num: 1 },
    { title: "星期六", num: 2 },
    { title: "星期日", num: 3 },
  ]

  const month = [
    { day: "每天"}, { day: "1号"}, { day: "2号"}, { day: "3号"}, { day: "4号"}, { day: "5号"},
    { day: "6号"}, { day: "7号"}, { day: "8号"}, { day: "9号"}, { day: "10号"}, { day: "11号"},
    { day: "12号"}, { day: "13号"}, { day: "14号"}, { day: "15号"}, { day: "16号"},
    { day: "17号"}, { day: "18号"}, { day: "19号"}, { day: "20号"}, { day: "21号"}, { day: "22号"},
    { day: "23号"}, { day: "24号"}, { day: "25号"}, { day: "26号"}, { day: "27号"}, { day: "28号"},
    { day: "29号"}, { day: "30号"}, { day: "31号"}
  ]

  defineExpose({
    openTimer(params?: any){
      drawerVisible.value = true;
    }
  })

</script>

<style scoped>
.top-box {
  margin-left: 80px;
  .tab-pane-box {
    display: inline-flex;
    text-align: center;
    margin-left: 5px;
    margin-bottom: 10px;
    flex-wrap: wrap;
    .tab-pane-square {
      width: 90px;
      height: 20px;
      padding: 5px;
      font-size: 14px;
      color: #606266;
      border: 1px solid #CCCCCC ;
      border-radius: 5px;
    }
    :hover {
      background-color: #009688;
      cursor: pointer;
      color: #fff
    }
  }
}
.dataPicker {
  display: flex;
  margin-left: 70px;
  color: #606266;
  font-size: 14px;  
  align-items: center
}
</style>