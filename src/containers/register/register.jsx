import React from 'react'
import { Redirect } from 'react-router-dom'
// 引入 react-redux
import { connect } from 'react-redux'
// 引入 antd
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile'

// 引入 actions 模块
import { register } from '../../redux/actions'
// 组件
import Logo from '../../components/logo/logo'

const ListItem = List.Item

class Register extends React.Component {
  state = {
    username: '',
    password: '',
    confirmPwd: '',
    type: 'employee',
  }
  handleInput(type, data) {
    // 可以直接在对象中使用 [] 来获取指定属性 [type]: data
    this.setState({ [type]: data });
  }
  register() {
    this.props.register(this.state)
  }
  toLogin() {
    this.props.history.push('/login');
  }
  render() {
    // 每次改变 state 后都会重新渲染
    const { msg, redirectTo } = this.props.user
    if (redirectTo) {
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
            <InputItem placeholder='请输入确认密码' type="password" onChange={(data) => this.handleInput('confirmPwd', data)}>确认密码:</InputItem>
            <WhiteSpace />
            <ListItem>
              <span>用户类型:</span>
              &nbsp;&nbsp;&nbsp;
              <Radio checked={this.state.type === 'employee'} onChange={() => this.handleInput('type', 'employee')}>职员</Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={this.state.type === 'employer'} onChange={() => this.handleInput('type', 'employer')}>老板</Radio>
            </ListItem>
            <WhiteSpace />
            <Button type='primary' onClick={() => this.register()}>注&nbsp;&nbsp;&nbsp;册</Button>
            <WhiteSpace />
            <Button onClick={() => { this.toLogin() }}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { register }
)(Register)