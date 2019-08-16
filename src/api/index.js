// 导入封装的 ajax 
import ajax from './ajax'

//注册 api  
export const reqRegister = (data) => ajax('/register', data, 'POST');

//登录 api  
export const reqLogin = (data) => ajax('/login', data, 'POST');

// 更新用户信息
export const updateUserInfo = (data) => ajax('/update', data, 'POST');

// 获取用户信息
export const getUserInfo = () => ajax('/user')

// 获取用户列表
export const getUserList = (type) => ajax('/userlist', type)

// 获取所有最新消息列表
export const getLastestMessages = () => ajax('/lastestmsgs');

// 对消息已读
export const readMsg = (from) => ajax('/readmsg',from, 'POST');

