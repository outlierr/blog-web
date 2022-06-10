import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import Index from "@/views/Index.vue"

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