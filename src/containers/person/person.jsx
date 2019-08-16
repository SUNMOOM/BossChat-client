import React from 'react'
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'

import { resetUser,resetChat,resetUserList } from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class Person extends React.Component {

  loginOut = () => {
    Modal.alert('退出', '确定退出登录吗？', [
      { text: '取消', onPress: () => null }, {
        text: '确认', onPress: () => {
          // 1. 清除 cookie 值
          Cookies.remove('userId')
          // 2. 清除 redux 状态
          this.props.resetUser()
          this.props.resetUserList()
          this.props.resetChat()
          this.props.history.replace('/login')
        }
      },
    ])

  }
  render() {
    const { username, header, company, job, info, salary } = this.props.user
    return (
      <div>
        <Result
          img={<img src={require(`../../assets/images/${header ? header : '头像1'}.png`)} alt="header" />}
          title={username}
          message={company}
        />

        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            <Brief>职位:{job}</Brief>
            <Brief>简介: {info}</Brief>
            {salary ? <Brief>薪资: {salary}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Button type='warning' onClick={this.loginOut}>退出登录</Button>
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { resetUser,resetChat,resetUserList }
)(withRouter(Person))