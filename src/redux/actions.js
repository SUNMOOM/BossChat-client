// 注册 socket.io 
import io from 'socket.io-client'

import {
  ERROR_MSG,
  AUTH_SUCCESS,
  RECEIVE_USER,
  // LOGIN_OUT_USER,
  RESET_USER,
  RECEIVE_USERLIST,
  RECEIVE_MSG,
  RECEIVE_LASTESTMSG,
  RESET_CHAT,
  RESET_USERLIST,
  READ_MSGACTION,
  UNREAD_COUNT
  // RECEIVE_MSGLISTBYCHATID
} from './action-types'
import {
  reqLogin,
  reqRegister,
  getUserInfo,
  updateUserInfo,
  getUserList,
  getLastestMessages,
  readMsg,
  // getLastestMsgByChatId
} from '../api/index'


/**同步操作集
 * 
 */
// 同步 actions 操作:
// 返回错误信息
const errorMsg = (msg) => ({
  type: ERROR_MSG,
  data: msg
})
// 授权成功
const authSuccess = (user) => ({
  type: AUTH_SUCCESS,
  data: user
})
// 接收用户信息
const receiveUser = (user) => ({
  type: RECEIVE_USER,
  data: user
})
// 注销登录,清除redux状态
export const resetUser = () => ({
  type: RESET_USER,
  data: {
    _id: '',
    username: '',
    type: '',
    msg: ''
  }
})
// 接收用户列表信息
const receiveUserList = (userlist) => ({
  type: RECEIVE_USERLIST,
  data: userlist
})
export const resetUserList = () => ({
  type: RESET_USERLIST,
  data: {}
})



/**异步操作集
 * 
 */
// 异步注册 action 操作
export const register = (user) => {
  // 前台检测数据
  const {
    username,
    password,
    confirmPwd,
    type
  } = user;
  if (!username) {
    return errorMsg('用户名必须指定！');
  } else if (password !== confirmPwd) {
    console.log(password, confirmPwd);
    return errorMsg('密码不一致！');
  } else if (!type) {
    return errorMsg('请选择你的角色！');
  }
  // 发布注册请求
  return async dispatch => {
    const response = await reqRegister({
      username,
      password,
      type
    });
    const resBody = response.data;
    if (resBody.code === 0) {
      initIO(dispatch)
      // 注册成功， 获取用户存储的信息，并跳到信息填写页面
      dispatch(authSuccess(resBody.data));
    } else {
      // 注册失败
      dispatch(errorMsg(resBody.msg));
    }
  }
}
// 异步登录 actions 操作  
export const login = (user) => {
  // 前台检查参数，如果不通过则返回 errorMsg 的同步 action（有 msg 状态属性）
  const {
    username,
    password
  } = user;

  // 同步action是在组件中dispatch调用，所以直接返回 errorMsg
  if (!username) {
    return errorMsg('用户名必须指定！');
  } else if (!password) {
    return errorMsg('密码必须指定！');
  }

  // 异步请求登录，成功则发布新的 action
  return async dispatch => {
    const response = await reqLogin(user);
    const resBody = response.data;
    if (resBody.code === 0) { // 成功， 则分发获取用户信息的 action，并传回用户信息
      initIO(dispatch)
      dispatch(authSuccess(resBody.data));
    } else { // 失败, 则dispatch 分发 errorMsg, 并传回 response.msg 响应信息
      dispatch(errorMsg(resBody.msg));
    }
  }
}
// 异步更新用户信息
export const updataUserAsync = (user) => {
  return async dispatch => {
    const response = await updateUserInfo(user)
    const result = response.data
    if (result.code === 0) {
      dispatch(receiveUser(result.data))
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
}
// 异步获取用户信息(自动登录)
export const getUserAsync = () => {
  return async dispatch => {
    // await 返回的是整体响应（包含响应头和响应体）
    const response = await getUserInfo()
    const result = response.data
    if (result.code === 0) {
      initIO(dispatch)
      dispatch(receiveUser(result.data))
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
}

// 异步获取主页用户列表
export const getUserListAsync = (type) => {
  return async dispatch => {
    const response = await getUserList(type)
    const result = response.data
    if (result.code === 0) {
      dispatch(receiveUserList(result.data))
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
}



//消息模块 action (消息一定是进入消息界面前 首先获取消息列表，再有发送或接收消息)
// 单例对象流程
const initIO = (dispatch) => {
  if (!io.socket) {
    // 1. 根据条件，创建单例对象
    // 2. 保存单例对象, 保存有两种方式(1. 作为属性保存在全局唯一的对象上 2. )
    io.socket = io('ws://localhost:4000')
    console.log('客户端成功启动socket');
    io.socket.on('serverMsg', function (chatMsg) {
      // console.log('客户端接收到来自服务器的消息', chatMsg);
      dispatch(receiveMsg({
        chatId: chatMsg.chatId,
        msg: chatMsg
      }))
    })
  }
}
// 同步操作
// 同步，接收消息
const receiveMsg = (msg) => ({
  type: RECEIVE_MSG,
  data: msg
})
// 同步，接收最新所有消息
export const receiveLastestMsg = (msgs) => ({
  type: RECEIVE_LASTESTMSG,
  data: msgs
})
// 同步，注销登录,清除redux状态
export const resetChat = () => ({
  type: RESET_CHAT,
  data: {}
})
// 同步，对消息已读
export const readMsgAction = (count) => ({
  type: READ_MSGACTION,
  data: count
})
export const unreadCount = (count) =>({
  type: UNREAD_COUNT,
  data: count
})

// export const receiveMsgListByChatId = (msgs) => ({
//   type: RECEIVE_MSGLISTBYCHATID,
//   data: msgs
// })
// 异步发送消息
export const sendMsg = (chatMsg) => {
  return async dispatch => {
    // 每一次发送都要是一个 socket 对象， 不能多次重复注册 socket 对象
    io.socket.emit('clientMsg', chatMsg)
    // console.log('客户端向服务端发送消息', chatMsg);
  }
}

// 异步获取最新消息及相关用户
export const getLastestMessagesAysnc = () => {
  return async dispatch => {
    initIO(dispatch)
    const response = await getLastestMessages()
    const result = response.data
    if (result.code === 0) {
      dispatch(receiveLastestMsg(result.data))
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
}

// 对消息已读
export const readMsgAsync = (from) => {
  return async dispatch => {
    const response = await readMsg(from)
    const result = response.data
    if (result.code === 0) {
      dispatch(readMsgAction(result.data))
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
}

// 异步，获取指定消息
// export const getLastestMsgByChatIdAysnc = (chatId) => {
//   return async dispatch => {
//     initIO(dispatch)
//     const response = await getLastestMsgByChatId(chatId)
//     const result = response.data
//     if (result.code === 0) {
//       console.log(result.data);
//       dispatch(receiveMsgListByChatId(result.data))
//     } else {
//       dispatch(errorMsg(result.msg))
//     }
//   }
// }