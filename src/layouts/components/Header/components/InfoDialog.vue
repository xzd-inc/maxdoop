<template>
  <el-drawer v-model="dialogVisible" title="个人信息">
    <div class="box">
      <div class="above">
        <div class="avatar">
          <img :src="avatar"  />
        </div>
        <div class="avatarInfo">
          <div class="userName">demo用户</div>
          <div class="position">管理员</div>
        </div>
      </div>
      <div class="info">
        <div>账号 <span class="correspondInfo">test</span></div>
        <div>真实姓名
          <span class="correspondInfo">demo用户</span>
          <span class="operate">编辑</span>
        </div>
        <div>openId 
          <span class="correspondInfo">xinshengwulian2024</span>
        </div>
        <div>性别
          <span class="correspondInfo">男</span>
          <span class="operate">编辑</span>
        </div>
        <div>微信 
          <span class="correspondInfo"></span>
          <span class="operate">已绑定</span>
        </div>
        <div>密码 
          <span class="correspondInfo"></span>
          <span class="operate">修改密码</span>
        </div>
        <div>手机号码 
          <span class="correspondInfo">123456789</span>
          <span class="operate">编辑</span>
        </div>
        <div>邮箱
          <span class="correspondInfo">123456789</span>
          <span class="operate">修改邮箱</span>
        </div>
        <div>项目推送 
          <span class="correspondInfo">未绑定</span>
          <span class="operate">绑定</span>
        </div>
      </div>
    </div>
    <span class="line"></span>
    <div class="noData">暂无数据</div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import defaultAvatar from "@/assets/images/avatar.gif";

const avatar = ref(defaultAvatar);
const dialogVisible = ref(false);
const openDialog = () => {
  dialogVisible.value = true;
};

defineExpose({ openDialog });
</script>

<style scoped>
.box {
  margin: 0 20px;
  color: #303133;
  font-size: 15px;
  font-weight: 600;
}

.above {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.avatar{
  width: 100px;
  height: 100px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
  }
}
.avatarInfo {
  margin-left: 20px;
}

.userName {
  font-size: 18px;
  font-weight: 600;
  color: #606266;
}

.position {
  font-size: 12px;
  color: #606266;
  margin-top: 10px;
}

.info {
  div+div {
    margin-top: 20px;
  }
}

.correspondInfo {
  color: #606266;
  margin-left: 10px;
  font-size: 14px;
}
.operate {
  color: #039688;
  margin-left: 10px;
  cursor: pointer;
  font-size: 14px;
}
.line{
  width: 500px;
  height: 1px;
  background-color: #CCCCCC;
  display: inline-block;
  margin-left: 20px;
}
.noData{
  text-align: center;
  margin-top: 20px;
  color: #CCCCCC;
}
</style>
