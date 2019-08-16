// 使用 combineReducers 整合 reducers
import {
  combineReducers
} from 'redux'

import {
  ERROR_MSG,
  AUTH_SUCCESS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USERLIST,
  RECEIVE_MSG,
  RECEIVE_LASTESTMSG,
  RESET_CHAT,
  RESET_USERLIST,
  READ_MSGACTION,
  UNREAD_COUNT
} from './action-types' // 自定义 actions type 常量字符串
import {
  getRedirectTo
} from '../utils/index'
const initUser = {
  _id: '',
  username: '',
  type: '',
  // 需要一个 msg 来接收异步的状态情况
  msg: ''
}

// 用户状态 
const user = (state = initUser, action) => {
  switch (action.type) {
    case ERROR_MSG:
      return {
        ...initUser, msg: action.data
      };
    case AUTH_SUCCESS:
      // type: 判断是什么类型， header：用来判断是否填写过信息
      const {
        type, header
      } = action.data
      return {
        ...action.data, redirectTo: getRedirectTo(type, header)
      };
    case RECEIVE_USER:
      return action.data
    case RESET_USER:
      return action.data
    default:
      return state;
  }
}

// 用户列表状态
const userlist = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_USERLIST:
      return action.data
    case RESET_USERLIST:
      return []
    default:
      return state
  }
}

const initChat = {
  users: [], // 所有用户信息的对象  属性名: userid, 属性值是: {username, header}
  msgHistories: {}, // 当前用户所有相关msg的数组
  unReadCount: 0, // 总的未读数量
  msgLastestList: []
}
const chat = (state = initChat, action) => {
  switch (action.type) {
    case RECEIVE_MSG:
      // console.log(action.data.chatId, state.msgHistories[action.data.chatId], action.data.msg)
      // 在消息历史记录中找寻是否存在 chatId
      if (Object.keys(state.msgHistories).includes(action.data.chatId)) {
        return ({
          ...state,
          msgHistories: {
            // ...state.msgHistories, 目的是保留之前的记录
            ...state.msgHistories,
            // 对于已有聊天ID 记录的消息， 直接在该 聊天ID 的数组最后面添加一条记录
            [action.data.chatId]: [...state.msgHistories[action.data.chatId], action.data.msg]
          }
        })
      }
      return ({
        ...state,
        msgHistories: {
          ...state.msgHistories,
          // 对于新的聊天ID 记录的消息，则另外添加一个属性， 并使用数组存放一个消息对象 
          [action.data.chatId]: [action.data.msg]
        }
      })
    case RECEIVE_LASTESTMSG:
      return ({
        unReadCount: 0,
        users: action.data.users,
        msgLastestList: action.data.msgLastestList,
        msgHistories: {
          ...state.msgHistories,
          // 获取每个聊天ID 的消息记录
          ...action.data.allMsgslist
        }
      })
    case READ_MSGACTION:
      if (state.unReadCount - action.data.counts > 0) {
        console.log(state.unReadCount, action.data.counts)
        return ({
          ...state,
          unReadCount: state.unReadCount - action.data.counts
        })
      }
      console.log(action.data.counts);
      return ({
        ...state,
        unReadCount: 0
      })
    case UNREAD_COUNT:
      return ({
        ...state,
        unReadCount: action.data
      })
    case RESET_CHAT:
      return initChat
    default:
      return state
  }
}

export default combineReducers({
  user,
  userlist,
  chat
})