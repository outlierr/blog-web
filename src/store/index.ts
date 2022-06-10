import { defineStore } from "pinia";
import {AuthType, User} from "@/api/core";

const GUEST: User = {
    id: 0,
    auth: AuthType.None,
    name: "(游客)",
}

export const useCurrentUser = defineStore("user", {
    state: () => GUEST, // 初始化当前用户为游客
    getters: {
        isAdmin: (state) => state.id == 1
    },
    actions: {
        async refresh() {

        },
        logout() {
            this.$reset()
        }
    }
})