import React from 'react'
import { Redirect } from 'react-router-dom'
// 引入 antd
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile'
import { connect } from 'react-redux'

import Logo from '../../components/logo/logo'
// 引入 actions 
import { login, getLastestMessagesAysnc } from '../../redux/actions'
class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }
  handleInput(type, data) {
    this.setState({
      // 可以直接在对象中使用 [] 获取指定属性
      [type]: data
    })
  }
  login = () => {
    const { username, password } = this.state
    // 发布 login action 
    this.props.login({
      username, password
    })
  }
  toRegister() {
    this.props.history.push('/register');
  }
  render() {
    // 每次改变 state 后都会重新渲染
    const { msg, redirectTo } = this.props.user
    if (redirectTo) {
      // 说明授权成功了，可以发个人消息记录请求了
      this.props.getLastestMessagesAysnc();
      return <Redirect to={redirectTo} />
    }
    return (
      <div>
        <NavBar>钉&nbsp;钉</NavBar>
        <Logo />
        <WingBlank>
          <List>
            {msg ? <div style={{ color: 'red', textAlign: 'center' }}>{msg}</div> : null}
            <WhiteSpace />
            {/* 注意可以直接 使用传递参数的形式来确定属性类型 */}
            <InputItem placeholder='请输入用户名' onChange={(data) => this.handleInput('username', data)}>用户名:</InputItem>
            <WhiteSpace />
            <InputItem placeholder='请输入密码' type="password" onChange={(data) => this.handleInput('password', data)}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
            <WhiteSpace />
            <WhiteSpace />
            <Button type='primary' onClick={() => this.login()}>登&nbsp;&nbsp;&nbsp;录</Button>
            <WhiteSpace />
            <Button onClick={() => { this.toRegister() }}>还未注册？</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  // state 为 形参, 向组件传入 store 值
  state => ({ user: state.user }),
  // 向组件传入 actions 值
  { login, getLastestMessagesAysnc }
)(Login)