import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import Index from "@/views/IndexPage.vue"

const routes: RouteRecordRaw[] = [
    {
       path: "/",
       component: Index,
       name: "Index"
    }
]

export default () => createRouter({
    routes: routes,
    history: createWebHistory(),
})