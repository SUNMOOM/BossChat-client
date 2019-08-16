import React, { Component } from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class Userlist extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    userlist: PropTypes.array.isRequired
  }
  redirectTo(id) {
    this.props.history.push(`/chatUserId/${id}`)
  }
  render() {
    if (this.props.type === 'employer') {
      return this.props.userlist.map(item => (
        <div key={item._id}>
          <WingBlank size="lg">
            <WhiteSpace size="lg" />
            <Card onClick={() => { this.redirectTo(item._id) }}>
              <Card.Header
                title={item.username}
                thumb={require(`../../assets/images/${item.header ? item.header : '头像1'}.png`)}
                extra={<span>{item.job}</span>}
              />
              <Card.Body>
                <div>{item.info}</div>
              </Card.Body>
            </Card>
            <WhiteSpace size="lg" />
          </WingBlank>
        </div>
      ))
    } else {
      return this.props.userlist.map(item => (
        <div key={item._id}>
          <WingBlank size="lg">
            <WhiteSpace size="lg" />
            <Card onClick={() => { this.redirectTo(item._id) }}>
              <Card.Header
                title={item.company}
                thumb={require(`../../assets/images/${item.header ? item.header : '头像1'}.png`)}
                extra={<span>{item.job}</span>}
              />
              <Card.Body>
                <div>{item.info}</div>
              </Card.Body>
            </Card>
            <WhiteSpace size="lg" />
          </WingBlank>
        </div>
      ))
    }
  }
}

export default withRouter(Userlist)

