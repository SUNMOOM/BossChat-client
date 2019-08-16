import React from 'react'
import { InputItem, Grid } from 'antd-mobile'
import PropTypes from 'prop-types'

import './input_box.css'

export default class inputBox extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    send: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    addEmoji: PropTypes.func.isRequired,
    isShowEmojis: PropTypes.bool.isRequired,
    toggleShow: PropTypes.func.isRequired
  }
  componentWillMount() {
    const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘 ', '😗 ', '😚',
      '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘 ']
    this.emojis = emojis.map(item => ({ text: item }))
    this.emojis = emojis.map(emoji => ({ text: emoji }))
  }
  renderItem = (el) => {
    return <span role="img" aria-label='hello' onClick={() => { }}>123</span>
  }
  render() {
    const { content, send, handleChange, addEmoji, isShowEmojis, toggleShow } = this.props
    return (<div className='input-box' >
      <InputItem
        value={content}
        placeholder="请输入"
        onChange={(content) => { handleChange(content) }}
        extra={(<span>
          <span role="img" aria-label='hello' onClick={() => { toggleShow() }}>😃</span>
          <span onClick={() => { send() }}>发送</span>
        </span>)}
      />
      {isShowEmojis ? (
        <Grid
          data={this.emojis}
          carouselMaxRow={3}
          columnNum={6}
          isCarousel
          onClick={(emoji) => { addEmoji(emoji.text) }}
          activeStyle={{ background: 'gray' }} />) : null}
    </div>)
  }
}