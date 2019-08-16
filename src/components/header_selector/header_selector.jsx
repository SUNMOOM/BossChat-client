import React, { Component } from 'react'
import { Grid } from 'antd-mobile'
import PropTypes from 'prop-types'

import './header_selector.css'

export default class header_selector extends Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }
  render() {
    const data = Array.from(new Array(12)).map((item, index) => ({
      text: `头像${index + 1}`,
      icon: require(`../../assets/images/头像${index + 1}.png`)
    }))
    return (
      <div>
        <div className="sub-title">请选择头像</div>
        <Grid data={data} onClick={el => {this.props.selectAvatar(el.text)}} />
      </div>
    )
  }
}
