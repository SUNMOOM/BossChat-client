import io from 'socket.io-client'

// 使用 ws 协议连接服务器, 生成一个对应服务器的 socket 对象
const socket = io('ws://localhost:4000')
// 监听服务器端是否发送消息
socket.on('serverMsg', function (data) {
  console.log('客户端接收来自服务端的消息', data);
})
// 客户端发送消息
socket.emit('clientMsg', {
  msg: 'hello'
})
console.log('客户端向服务端发送消息', {
  msg: 'hello'
});

// 最后需要将该模块文件挂载到 index.js 入口文件执行