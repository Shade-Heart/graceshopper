import React from 'react'
import AddHat from './AddHat'
import EditHat from './EditHat'
import {connect} from 'react-redux'

export class MyAccount extends React.Component {
  render() {
    const defaultUser = this.props.defaultUser
    const isAdmin = !!(defaultUser !== {} && defaultUser.user.isAdmin)

    const adminPage = (
      <div className="bgPages">
        <h1> Hello Admin {defaultUser.user.firstName}</h1>
        <div>
          <h3>Admin Controls</h3>
          <AddHat isAdmin={isAdmin} />
          <EditHat isAdmin={isAdmin} />
        </div>
      </div>
    )

    const userPage = (
      <div>
        <h3>Past Orders</h3>
      </div>
    )

    return isAdmin ? adminPage : userPage
  }
}

const mapState = state => {
  return {
    defaultUser: state
  }
}
export default connect(mapState)(MyAccount)
