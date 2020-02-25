import fly from 'flyio';
import config from '@/utils/config';
import { Toast } from 'vant';
//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.config.baseURL = config.hostUrl;
fly.interceptors.response.use(
    (res) => {
        res = typeof res === 'string'? JSON.parse(JSON.stringify(res.trim())): res;
        // console.log(typeof res.data === 'string');
        var data = typeof res.data === 'string'? JSON.parse(res.data.trim()): res.data;
        // console.log(data);
        if (+data.code === 1 || data.success || data.data.member_id) {
            // 请求成功
            return data
        }else {
            Toast(data.msg || '请求失败');
            return Promise.reject('请求失败');
        }
    },
    () => {
        //发生网络错误后会走到这里
        //return Promise.resolve("ssss")
    }
)

export default fly;
