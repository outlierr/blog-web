<template>
  <top-nav />
  <div :class="$style.body">
    <div :class="$style['picture-box']">
      <img src="@/assets/img/LoginPicture.jpg" :class="$style.picture" />
    </div>
    <component
      :is="activePanel"
      :class="$style.formPanel"
      :return-uri="returnUri"
      @switch-panel="switchPanel"
    />
  </div>
</template>

<script lang="ts">
// 普通 <script>, 在模块范围下执行(只执行一次), <script setup> 在setup() 作用域中执行 (对每个实例皆如此)
import { defineComponent } from "vue";

/**
 * 将前一个页面的地址记录到 returnUri 属性中，以便登陆后返回。
 *
 * vue-router 的 next 参数没泛型，导致 returnUri 标错，不影响构建。
 */
export default defineComponent({  // 只需要执行一次，不在 setup 中执行
  beforeRouteEnter(to, from, next) {
    const param = to.query.return_uri;
    // 如果网址 uri 中有携带返回地址则返回
    if (param) {
      return next((vm) => (vm.returnUri = param));
    }
    const fromPath = from.fullPath;
    // 如果上一个页面是登录页面则返回到首页
    if (fromPath.startsWith("/login")) {
      return next((vm) => (vm.returnUri = this.returnUri));
    }
    next((vm) => (vm.returnUri = fromPath));
  },
});
</script>

<script setup lang="ts">
import TopNav from "@/components/TopNav.vue";
import LoginForm from "./LoginForm.vue";
import SignupForm from "./SignupForm.vue";
import { shallowRef } from "vue";

const activePanel = shallowRef<any>(LoginForm);
const returnUri = shallowRef("/");

function switchPanel(name: string) {
  console.log(123);
  if (name === "LoginPanel") {
    activePanel.value = LoginForm;
  } else {
    activePanel.value = SignupForm;
  }
}

defineExpose({ returnUri });
</script>

<style lang="scss">
// 统一登录和注册的表单大小
.login-form {
  display: grid;
  // 两列 第一列 4em 大小宽 剩下的全部给后面列
  grid-template-columns: 4em 1fr;
  column-gap: 0.5em; // 列间隔
  row-gap: 1em; // 行间隔

  & > label {
    // 单元格内容垂直方向垂直
    align-self: center;
    // 单元格水平方向靠右
    //justify-self: right;
    // 相邻兄弟选择器
    & + div {
      grid-column-start: 2;
    }
  }

  & > .center {
    text-align: center;
    //grid-column-start 和 grid-column-end 总共两列三条线 这个让标题占满一行
    grid-column: 1 / 3;
  }

  & > .buttons {
    grid-column: 1 / 3;
    display: flex;

    & > * {
      flex: 1;
    }

    & > *:not(:last-child) {
      margin-right: 1rem;
    }

    //& > .is-plain:active {
    //  background-color: #ffffff;
    //}
  }
}
</style>

<style module lang="scss">
@import "../../css/imports";

.body {
  display: flex;
  align-items: flex-start;
  font-size: 14px;

  flex: 1;

  max-width: 980px;
  margin: 0 auto;
  padding: 40px 0;

  @media screen and (min-width: $length-screen-mobile) {
    padding: 80px 0 20px 0;
  }
}

.picture-box {
  position: relative;
  width: 50%;
  padding: 0 20px;

  &::after {
    content: "";
    position: absolute;
    top: -2rem;
    bottom: 0;
    right: 0;
    width: 1px; // 1px的间隔线
    background-image: -webkit-linear-gradient(
      top,
      #fff,
      #d5d5d5 10%,
      #d5d5d5 90%,
      #fff 100%
    );
  }
}

.picture {
  max-width: 100%;
}

.formPanel {
  width: 20rem;
  margin: 0 auto;
}
</style>
