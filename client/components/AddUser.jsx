import React from 'react'
import {connect} from 'react-redux'

export default class AddUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isAdmin: '',
      toggle: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onClick = this.onClick.bind(this)
  }
  render() {
    return (
      <div>
        <div>
          {this.props.isAdmin} ? ( this.state.toggle ? (
          <button onClick={() => this.onClick()}>Hide Add User</button>
          ) : (
          <button onClick={() => this.onClick()}>Add User</button>
          ) ) : (
          <h2 />
          )}
        </div>
        {this.state.toggle && (
          <form onSubmit={this.handleSubmit}>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                oncChange={this.handleChange}
                value={this.state.firstName}
                required
              />
            </label>

            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                oncChange={this.handleChange}
                value={this.state.firstName}
                required
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                oncChange={this.handleChange}
                value={this.state.lastName}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                name="email"
                oncChange={this.handleChange}
                value={this.state.email}
                required
              />
            </label>

            <label>
              Password:
              <input
                type="text"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
                required
              />
            </label>
            <label>
              isAdmin:
              <select
                name="isAdmin"
                onChange={this.handleChange}
                value={this.state.isAdmin}
                required
              >
                <option value="false">false</option>
                <option value="true">true</option>
              </select>
            </label>

            <div id="submitButton">
              <button type="submit">Sumbit New User</button>
            </div>
          </form>
        )}
      </div>
    )
  }
}
