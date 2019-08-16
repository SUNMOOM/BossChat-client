import axios from 'axios'
// const Base_Host = 'http://localhost:3000' 
// 跨域的三个解决方案： 1. 使用 jsonp 前端解决  2. 后端放开访问 设置 Access-Control-Allow-Origin:*
// 使用 代理操作， 在 package.json 设置 proxy 为 http://localhost:4000 ，进行代理
const Base_Host = 'http://localhost:3000'
export default function ajax(path, data = {}, method = 'GET') {
  let url = Base_Host + path
  if (method === 'GET') {
    let paramStr = '';
    Object.keys(data).forEach(key => {
      paramStr += `${key}=${data[key]}&`
    })
    paramStr = paramStr.slice(0, -1);
    // 注意： axios 返回的是一个 promise
    return axios.get(url + '?' + paramStr);
  } else if (method === 'POST') {
    // 注意： axios 返回的是一个 promise
    return axios.post(url, data);
  }
}