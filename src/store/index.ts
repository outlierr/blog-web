import { defineStore } from "pinia";
import { AuthType, User } from "@/api/user";
import api from "@/api";

const GUEST: User = {
  id: 0,
  auth: AuthType.None,
  name: "(游客)",
  avatar: null as any,
};

export const useCurrentUser = defineStore("user", {
  state: () => GUEST, // 初始化当前用户为游客
  getters: {
    isAdmin: (state) => state.id == 1,
  },
  actions: {
    // 获取用户信息并刷新 state 的值
    async refresh() {
      const res = await api.user.getCurrent();
      console.log(res.data)
      if(res.status < 300) {
        this.$patch(res.data)
      }
    },
    logout() {
      return api.user.logout().then(() => this.$reset())
    },
  },
});
