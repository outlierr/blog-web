import { AxiosInstance, AxiosRequestConfig } from "axios";

/**
 * 继承这个类可以省略写构造方法
 */
export class AbstractResource {
    /**
     * 简化写法
     * protected readonly server;
     * constructor(server: AxiosInstance){
     *     this.server = server;
     * }
     * @param server
     */
    constructor(protected readonly server: AxiosInstance) {}
}

// 起个别名
export type RequestConfigProcessor = (config: AxiosRequestConfig) => void;

/**
 * 使用ES6代理Axios，以便在请求前修改设置。
 *
 * Axios创建实例不能再使用create来扩展，并且用了个wrap函数封装使得扩展难以进行，
 * 所以才用这种方式，等1.0版本出了再看看能不能用更优雅的方法。
 */
export class AxiosProxy implements ProxyHandler<AxiosInstance> {
    private readonly processor: RequestConfigProcessor;

    // RequestConfigProcessor 请求前的 config 设置项
    constructor(processor: RequestConfigProcessor) {
        this.processor = processor;
    }

    private prepare(config?: AxiosRequestConfig) {
        config ??= {};
        this.processor(config);
        return config;
    }

    get(target: AxiosInstance, name: keyof AxiosInstance) {
        switch (name) {
            case "request":
                return (config: AxiosRequestConfig) => target[name](this.prepare(config));
            case "get":
            case "delete":
            case "head":
                return (url: string, config: AxiosRequestConfig) => target[name](url, this.prepare(config));
            case "post":
            case "put":
            case "patch":
                return (url: string, data: any, config: AxiosRequestConfig) => target[name](url, data, this.prepare(config));
            default:
                return target[name];
        }
    }
}