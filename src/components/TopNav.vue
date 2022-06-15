<template>
  <nav :class="$style.nav">
    <div :class="$style.container">
      <router-link to="/" title="回到首页">
        <h1 class="compact">Outlierr</h1>
      </router-link>
      <div :class="$style['nav-right']">
        <template v-if="user.id > 0">
          <img
            :src="user.avatar ?? DEFAULT_AVATAR"
            :alt="user.name"
            class="small head"
            :class="$style.head"
          />
          <router-link
            v-if="user.isAdmin"
            to="/console"
            :class="$style['nav-item']"
          >
            管理
          </router-link>
          <button @click="logout" :class="$style['nav-item']">退出登录</button>
        </template>
        <router-link v-else to="/login" :class="$style['nav-item']">
          登录
        </router-link>
        <router-link to="/about/me" :class="$style['nav-item']">
          关于
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useCurrentUser } from "@/store";
import { DEFAULT_AVATAR } from "@/common";

const user = useCurrentUser();

console.log(user.$state)

function logout() {
  user.logout();
}
</script>

<style module lang="scss">
@import "../css/imports";

.nav {
  display: inline-block;
  height: 48px;
  width: 100%;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.15);
}

.container {
  display: flex;
  line-height: 48px;
  background-color: rgba(255, 255, 255, 0.5);

  @media screen and (min-width: $length-screen-pad) {
    padding: 0 5vw;
  }
}

.nav-right {
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
}

.head {
  vertical-align: top;
  margin: 0 10px;
}

.nav-item {
  display: inline-flex;
  // 不换行只有一条轴 使用 items 居中
  align-items: center;

  padding: 0 1.5rem;
  background-color: transparent;
  line-height: 48px;
  // 文本不可选择
  cursor: pointer;
  user-select: none;
  font-size: 16px;

  &:hover,
  &:focus {
    text-decoration: none;
    color: black;
    background-color: rgba(0, 0, 0, 0.4);
  }
}
</style>
