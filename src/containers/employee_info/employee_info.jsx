import React, { Component } from 'react'
import { NavBar, InputItem, Button, TextareaItem } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { updataUserAsync } from '../../redux/actions'
import HeaderSelector from '../../components/header_selector/header_selector'

class EmployeeInfo extends Component {
  state = {
    header: '',
    job: '',
    info: '',
  }
  handleChange(type, value) {
    this.setState({
      [type]: value
    })
  }
  selectAvatar = (avatar) => {
    this.setState({
      header: avatar
    })
  }
  render() {
    const { type, header } = this.props.user;
    if (type !== 'employee') {
      return <Redirect to={`/${type}info`} />
    }
    else if (header) {
      return <Redirect to={`/${type}`} />
    }
    return (
      <div>
        <NavBar> 求职信息完善</NavBar>
        <HeaderSelector selectAvatar={this.selectAvatar} />
        <InputItem placeholder='请输入求职岗位' onChange={(value) => { this.handleChange('job', value) }}>求职岗位:</InputItem>
        <TextareaItem title="个人介绍:"
          placeholder='请输入个人介绍'
          rows={3} onChange={(value) => { this.handleChange('info', value) }} />
        <Button type='primary' onClick={() => { this.props.updataUserAsync(this.state) }}>保&nbsp;&nbsp;&nbsp;存</Button>
      </div>
    )
  }
}

export default connect(
  state => state,
  { updataUserAsync }
)(EmployeeInfo)
