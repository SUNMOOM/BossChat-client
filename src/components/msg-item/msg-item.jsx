import React from 'react'
import PropTypes from 'prop-types'

import './msg-item.css'


export default class MsgItem extends React.Component {
  static propTypes = {
    msg: PropTypes.object.isRequired
  }
  state = {
    defautAvatar: require('../../assets/images/头像4.png')
  }
  componentDidMount() {
    // 自动滑动到底部, 因为消息记录是异步获取的，所以需要在
    // scrollTo( x轴,y轴 ) 
    window.scrollTo(0, document.body.scrollHeight)
  }
  render() {
    const { avatar, content, isMe } = this.props.msg
    return (
      <div className={isMe ? "msg-item-right" : "msg-item-left"}>
        <div className="avatar">
          <img src={avatar ? avatar : this.state.defautAvatar} alt="张三" />
        </div>
        <div className="msg-content"><p>{content}</p></div>
        <div className="avatar">
        </div>
      </div>
    )
  }
}
