import React from 'react'
import { connect } from 'react-redux'

import Userlist from '../../components/user-list/user-list'
import { getUserListAsync } from '../../redux/actions'

class Employer extends React.Component {
  componentWillMount() {
    this.props.getUserListAsync({ type: 'employer' })
  }
  render() {
    return (
      <div>
        <Userlist type={this.props.user.type} userlist={this.props.userlist} />
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user, userlist: state.userlist }),
  { getUserListAsync }
)(Employer)
