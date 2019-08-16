// 集中处理子页面

import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import Cookies from 'js-cookie'

import Employee from '../employee/employee'
import EmployeeInfo from '../employee_info/employee_info'
import Employer from '../employer/employer'
import EmployerInfo from '../employer_info/employer_info'
import Message from '../message/message'
import Person from '../person/person'
import Chat from '../chat/chat'

import NavTab from '../../components/navtab/navtab'
import { getUserAsync, getLastestMessagesAysnc } from '../../redux/actions'


// import NavTab from '../components/navtab/navtab'

class Main extends React.Component {
  navList = [{
    navTitle: '求职列表',
    path: '/employer',
    tab: '主页',
    icon: 'employer',
    component: Employer
  }, {
    navTitle: '公司列表',
    path: '/employee',
    tab: '主页',
    icon: 'employee',
    component: Employee
  }, {
    navTitle: '消息列表',
    path: '/message',
    tab: '消息',
    icon: 'message',
    component: Message
  }, {
    navTitle: '个人主页',
    path: '/person',
    tab: '我的',
    icon: 'person',
    component: Person
  }]
  componentWillMount() {
    // 会有两种登录状态：1.组件中存在state 用户状态（即用户的切换操作），2.组件中没有用户状态，但保留了cookie的登录记录（即用户界面临时退出）

    // 获取本地用户信息
    const userId = Cookies.get('userId');
    const { _id } = this.props.user
    // 判断是否有用户状态
    if (!_id) {// 没有，请求用户信息
      if (userId) {// 有cookie值， 根据cookie请求信息
        this.props.getUserAsync(userId);
        this.props.getLastestMessagesAysnc();
      } else {// 没有cookie值，表示用户未曾登录，跳转到登录页面
        this.props.history.replace('/login');
      }
    }
    // 有用户信息，则直接显示主界面
  }

  render() {
    const { pathname } = this.props.location;
    let current = this.navList.find(item => pathname === item.path)
    if (current) {
      const navList = this.navList.filter(item => item.icon === this.props.user.type).concat(this.navList.slice(2))
      return (
        <div >
          <NavBar>{current.navTitle}</NavBar>
          <div className='app-container'>
            <Route path={current.path} component={current.component} />
          </div>
          <NavTab navList={navList} unReadCount={this.props.chat.unReadCount}/>
        </div>
      )
    }
    else if (pathname === '/employerinfo' || pathname === '/employeeinfo' || pathname.startsWith('/chatUserId')) {
      return (
        <Switch>
          <Route path='/employerinfo' component={EmployerInfo} />
          <Route path='/employeeinfo' component={EmployeeInfo} />
          <Route path='/chatUserId/:chatUserId' component={Chat} />
        </Switch>
      )
    }
    return <Redirect to='/login' />
  }
}
export default connect(
  state => state,
  { getUserAsync, getLastestMessagesAysnc }
)(Main)