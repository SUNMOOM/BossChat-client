import React, { Component } from 'react'
import { NavBar, InputItem, Button, TextareaItem } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { updataUserAsync } from '../../redux/actions'
import HeaderSelector from '../../components/header_selector/header_selector'

class EmployerInfo extends Component {
  state = {
    header: '',
    company: '',
    job: '',
    salary: '',
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
    if (type !== 'employer') {
      return <Redirect to={`/${type}info`} />
    }
    else if (header) {
      return <Redirect to={`/${type}`} />
    }
    return (
      <div>
        <NavBar>招聘信息完善</NavBar>
        <HeaderSelector selectAvatar={this.selectAvatar} />
        <InputItem placeholder='请输入公司名称' onChange={(value) => { this.handleChange('company', value) }}>公司名称:</InputItem>
        <InputItem placeholder='请输入招聘职位' onChange={(value) => { this.handleChange('job', value) }}>招聘职位:</InputItem>
        <InputItem placeholder='请输入职位薪资' onChange={(value) => { this.handleChange('salary', value) }}>职位薪资:</InputItem>
        <TextareaItem title="职位要求:"
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
)(EmployerInfo)
