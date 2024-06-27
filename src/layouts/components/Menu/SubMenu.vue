<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
      <template #title>
        <el-icon v-if="isVNodeIcon(subItem.meta.icon)">
          <component :is="subItem.meta.icon"></component>
        </el-icon>
        <span class="sle">{{ subItem.meta.title }}</span>
      </template>
      <SubMenu :menu-list="subItem.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
      <el-icon v-if="isVNodeIcon(subItem.meta.icon)">
        <component :is="subItem.meta.icon"></component>
      </el-icon>
      <template #title>
        <span class="sle">{{ subItem.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
  <div class="contact">
    <el-popover placement="right" width="320" trigger="hover">
      <template #reference>
        <div class="contact-box">
          <!-- <i class="el-icon-phone" /> -->
          在线公众号
        </div>
      </template>
      <div class="item">
        <div>
          <h4 style="margin-top: 0">微信在线客服</h4>
          <div>微信在线，即时沟通!</div>
        </div>
        <img
          class="contact-icon-img"
          src="@/assets/images/微信客服号.png
      "
        />
      </div>
      <div class="contact-line"></div>
      <div class="item">
        <div>
          <h4 style="margin-top: 0">微信公众号</h4>
          <div>最新消息，关注不错过!</div>
        </div>
        <img class="contact-icon-img" src="@/assets/images/微信公众号.jpg" style="width: 110px; margin-left: 30px" />
      </div>
    </el-popover>
    <div class="contact-box" @click="toDocMaxdoop">产品文档</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { resolveComponent } from "vue";

defineProps<{ menuList: Menu.MenuOptions[] }>();

function isVNodeIcon(icon: string): boolean {
  return typeof resolveComponent(icon) === "string" ? false : true;
}

const router = useRouter();
const handleClickMenu = (subItem: Menu.MenuOptions) => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank");
  router.push(subItem.path);
};

const toDocMaxdoop = () => {
  window.open("http://doc.maxdoop.com");
};
</script>

<style lang="scss">
.el-sub-menu .el-sub-menu__title:hover {
  color: var(--el-menu-hover-text-color) !important;
  background-color: transparent !important;
}
.el-menu--collapse {
  .is-active {
    .el-sub-menu__title {
      color: #ffffff !important;
      background-color: var(--el-color-primary) !important;
    }
  }
}
.el-menu-item {
  &:hover {
    color: var(--el-menu-hover-text-color);
  }
  &.is-active {
    color: var(--el-menu-active-color) !important;
    background-color: var(--el-menu-active-bg-color) !important;
    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 4px;
      content: "";
      background-color: var(--el-color-primary);
    }
  }
}
.vertical,
.classic,
.classify,
.transverse {
  .el-menu-item {
    &.is-active {
      &::before {
        left: 0;
      }
    }
  }
}
.columns {
  .el-menu-item {
    &.is-active {
      &::before {
        right: 0;
      }
    }
  }
}
.contact {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1;
  .contact-box {
    width: 130px;
    height: 35px;
    padding: 10px 40px;
    font-size: 14px;
    line-height: 35px;
    cursor: pointer;
    &:hover {
      background-color: #e6f5f3;
    }
  }
  .el-icon-phone {
    font-size: 13px;
  }
}

.item {
  display: flex;
  align-items: center;
  white-space: nowrap;
}
.contact-line {
  width: 100%;
  height: 2px;
  background-color: #f2f3f5;
  margin: 5px 0;
}
.contact-icon-img {
  width: 100px;
  margin-left: 50px;
}
</style>
