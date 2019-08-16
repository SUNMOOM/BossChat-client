import React from 'react'
import { List, SwipeAction, Badge } from 'antd-mobile'
import { connect } from 'react-redux'

import { readMsgAction, unreadCount } from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief


class Message extends React.Component {
  state = {
    counts: {}
  }
  redirectTo(id) {
    this.props.history.push(`/chatUserId/${id}`)
  }
  componentDidMount() {
    // 因为是异步获取，所以只能监听到状态变化时更新,且值更新一次
    const { msgHistories } = this.props.chat
    const { _id } = this.props.user
    if (!Object.keys(this.state.counts).length && Object.keys(msgHistories).length && _id) {
      let counts = {}
      let total = 0
      Object.keys(msgHistories).forEach(chatId => {
        const count = msgHistories[chatId].reduce((sum, msg) => {
          if (!msg.read && _id === msg.to) {
            return sum += 1
          } else {
            return sum += 0
          }
        }, 0)
        total += count
        counts = { ...counts, [chatId]: count }
        this.props.unreadCount(total)
      })
      this.setState({ counts })
    }
  }

  render() {
    const { users, msgLastestList } = this.props.chat
    const { _id } = this.props.user
    return (
      <div className='app-container'>
        <List>
          {msgLastestList ? (msgLastestList.slice().sort((a, b) => {
            if (a.createTime > b.createTime) {
              return -1
            } else {
              return 1
            }
          }).map(item => {
            const currentChatUserId = item.from === _id ? item.to : item.from
            const currentChatUser = users.find(item => item._id === currentChatUserId)
            const chatId = [_id, currentChatUserId].sort().join('_')
            if (currentChatUser) {
              const time = new Date(item.createTime).toLocaleString().split(/\s|:\d+$/)[1]
              return (
                <SwipeAction
                  key={item._id}
                  style={{ backgroundColor: 'gray' }}
                  autoClose
                  right={[{
                    text: '已读',
                    onPress: () => console.log('cancel'),
                    style: { backgroundColor: '#ddd', color: 'white' },
                  }, {
                    text: '删除',
                    onPress: () => console.log('delete'),
                    style: { backgroundColor: '#F4333C', color: 'white' },
                  }]}
                >
                  <Item
                    thumb={require('../../assets/images/头像1.png')}
                    extra={(
                      <span>
                        <span>{time}</span>
                        <Badge text={this.state.counts[chatId]} />
                      </span>
                    )}
                    onClick={() => { this.redirectTo(currentChatUserId) }}
                  >
                    {currentChatUser.username}
                    <Brief>{item.content}</Brief>
                  </Item>
                </SwipeAction>
              )
            } else return null
          })) : null}
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user, chat: state.chat }),
  { readMsgAction, unreadCount }
)(Message)