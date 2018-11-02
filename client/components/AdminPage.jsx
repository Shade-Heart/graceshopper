import React from 'react'
import AddHat from './AddHat'
import EditHat from './EditHat'

import {connect} from 'react-redux'

export class AdminPage extends React.Component {
  render() {
    const defaultUser = this.props.defaultUser
    const isAdmin = !!(defaultUser !== {} && defaultUser.user.isAdmin)
    console.log(this.props)
    return isAdmin ? (
      <div>
        <h3>
          {' '}
          Hello, Admin {defaultUser.user.firstName} {defaultUser.user.lastName}{' '}
        </h3>
        <AddHat isAdmin={isAdmin} />
        <EditHat isAdmin={isAdmin} />
      </div>
    ) : (
      <h1>NO ADMIN ACCESS</h1>
    )
  }
}

const mapState = state => {
  return {
    defaultUser: state
  }
}
export default connect(mapState)(AdminPage)
