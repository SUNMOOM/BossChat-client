import React, { Component } from 'react'
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import './navtab.css'

const { Item } = TabBar

class NavTab extends Component {
  static propTypes = {
    navList: PropTypes.array.isRequired,
    unReadCount: PropTypes.number.isRequired
  }

  render() {
    const { navList, unReadCount } = this.props
    return (
      <div className="tab-bar">
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          {
            navList.map(item => (
              <Item
                title={item.tab}
                key={item.tab}
                icon={{ uri: require(`./images/${item.icon}.png`) }}
                selectedIcon={{ uri: require(`./images/${item.icon}-selected.png`) }}
                selected={item.path === this.props.location.pathname}
                badge={item.path === '/message' ? unReadCount : 0}
                onPress={() => { this.props.history.push(item.path) }}
              />
            ))
          }
        </TabBar>
      </div>
    )
  }
}

export default withRouter(NavTab)