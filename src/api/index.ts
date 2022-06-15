import { RequestConfigProcessor, AxiosProxy } from "@/api/core";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import UserApi from "@/api/user";

// 让 axios 携带 cookie 进行请求
axios.defaults.withCredentials = true

export class Api {
    private readonly server: AxiosInstance;

    constructor(server: AxiosInstance) {
        this.server = server;
    }

    static register(name: string, clazz: any) {
        Object.defineProperty(Api.prototype, name, {
            get() {
                return new clazz(this.server);
            },
            enumerable: true,
            configurable: true,
        });
    }

    withConfig(processor: RequestConfigProcessor) {
        return new Api(new Proxy(this.server, new AxiosProxy(processor)));
    }

    /**
     * 设置取消信号，使请求能够取消。
     *
     * @param signal 取消信号
     * @return API 集
     */
    withCancelToken(signal?: AbortSignal) {
        return this.withConfig((config) => (config.signal = signal));
    }
}

function createAxios(config?: AxiosRequestConfig) {
    const instance = axios.create(config);
    // 配置请求拦截
    instance.interceptors.response.use(undefined, (error) => {
        if (error.response) {
            error.code = error.response.status;
        } else {
            error.code = -1; // 连接失败
        }
        return Promise.reject(error);
    });
    return instance;
}

Api.register("user", UserApi);

// 让 ide 能提示
export interface Api {
    user: UserApi;
}

export default new Api(createAxios({baseURL: "http://localhost:8081"}));