import React from 'react'
import { NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import MsgItem from '../../components/msg-item/msg-item'
import InputBox from '../../components/input_box/input_box'
import { sendMsg, getUserListAsync, getLastestMessagesAysnc, readMsgAsync } from '../../redux/actions'

class Chat extends React.Component {
  state = {
    content: '',
    currentChatUser: {},
    isShowEmojis: false
  }
  // 对于向下传递的函数，需要使用箭头函数， 或 使用 bind 绑定this, 
  handleChange = (content) => {
    this.setState({ content })
  }
  addEmoji = (emoji) => {
    this.setState({ content: this.state.content + emoji })
  }
  toggleShow = () => {
    const { isShowEmojis } = this.state
    this.setState({ isShowEmojis: !isShowEmojis })
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
      window.scrollTo(0, document.body.scrollHeight)
    }, 0)
  }
  send = () => {
    const from = this.props.user._id
    const to = this.props.match.params.chatUserId
    const chatId = [from, to].sort().join('_')
    const content = this.state.content
    const createTime = (new Date()).getTime()
    this.props.sendMsg({ chatId, from, to, content, createTime })
    this.props.getLastestMessagesAysnc()
    this.setState({ content: '', isShowEmojis: false })
  }

  componentDidMount() {
    const { chatUserId } = this.props.match.params
    this.props.readMsgAsync({ from: chatUserId })
    this.props.getLastestMessagesAysnc()
  }

  render() {
    if (!this.props.user._id) { // user 未加载
      return <div>加载中</div>
    } else if (this.props.user._id && this.props.userlist.length === 0) { // user 已加载，但 userlist 未加载
      this.props.getUserListAsync({ type: this.props.user.type })
      return <div>加载中</div>
    } else {// user ，userlist 和都已加载
      const { isShowEmojis, content } = this.state
      const { _id } = this.props.user
      const { chatUserId } = this.props.match.params
      const chatId = [_id, chatUserId].sort().join('_')
      // 寻找当前对面聊天用户
      const currentChatUser = this.props.userlist.find(item => item._id === chatUserId)
      // 找寻与当前聊天用户的记录
      const msgList = this.props.chat.msgHistories[chatId]
      return (
        <div>
          <NavBar icon={<Icon type="left" onClick={() => { this.props.history.goBack() }} />} >{currentChatUser.username ? currentChatUser.username : '加载中'}</NavBar>
          <div className="app-container" style={isShowEmojis ? { marginBottom: '251px' } : null}>
            {/* 因为 msgList 为异步获取，所以第一次渲染会为 undefined， 所以需要判断， 等异步获取的第二次render中进行渲染 */}
            {msgList ? msgList.slice().sort((a, b) => {
              if (a.createTime < b.createTime) return -1
              else return 1
            }).map(item => {
              const isMe = item.from === _id
              return <MsgItem key={item._id} msg={{ ...item, isMe: isMe }} />
            }) : null}
          </div>
          <InputBox
            content={content}
            send={this.send}
            handleChange={this.handleChange}
            addEmoji={this.addEmoji}
            isShowEmojis={isShowEmojis}
            toggleShow={this.toggleShow} />
        </div>
      )
    }
  }
}

export default connect(
  state => ({ user: state.user, chat: state.chat, userlist: state.userlist }),
  { sendMsg, getUserListAsync, getLastestMessagesAysnc, readMsgAsync }
)(withRouter(Chat))