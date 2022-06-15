/**
 * 从 Axios 的错误原因对象中提取错误信息
 * @param obj 异常
 */
export function errorMessage(obj: any) {
    const res = obj.response;
    if(res?.data?.message) {
        return res.data.message;
    }
    return obj.message || "未知错误";
}