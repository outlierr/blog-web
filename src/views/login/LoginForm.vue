<template>
  <form @keyup.enter="login" class="login-form">
    <h1 class="center">登录</h1>
    <label for="username">用户名:</label>
    <el-input id="username" v-model="form.username"/>
    <!--    <el-input id="name"/>-->
    <label for="password">密码:</label>
    <el-input id="password" v-model="form.password" type="password" show-password/>
    <el-checkbox :class="$style['center-cb']" class="center" label="记住我" v-model="form.remember"/>
    <div class="buttons">
      <el-button type="primary" plain size="large" @click="login"
        >登录</el-button
      >
      <el-button type="info" plain disabled size="large">注册</el-button>
    </div>
    <span class="center" :class="$style.separator"> 第三方登录 </span>
  </form>
</template>

<script setup lang="ts">
import { reactive, toRaw } from "vue";
import api from "@/api";
import { useCurrentUser } from "@/store";
import { ElMessage } from "element-plus";
import { errorMessage } from "@/utils";
import {useRouter} from "vue-router";

interface LoginFormProps {
  returnUri: string;
}

const props = defineProps<LoginFormProps>();
const emit = defineEmits(["switch-panel"]);

const user = useCurrentUser();
const router = useRouter();

const form = reactive({
  password: "",
  username: "",
  remember: false,
});

function switchPanel() {
  emit("switch-panel", "SignupPanel");
}

async function login() {
  try {
    await api.user.login(toRaw(form));
    await user.refresh();
    await router.push(props.returnUri);
  } catch (e) {
    ElMessage.error(errorMessage(e));
  }
}
</script>

<style module lang="scss">
.center-cb {
  height: auto !important; //消除原本控件的固定高度
  justify-self: center !important;
}

.separator {
  position: relative;
  color: #747474;
  margin-top: 0.5rem;

  &::before,
  &::after {
    content: "";
    position: absolute;
    height: 1px;
    background-color: #dce2e6;
    top: 50%; // 行高中间
    width: 30%;
  }

  &::before {
    right: 0;
  }

  &::after {
    left: 0;
  }
}
</style>
