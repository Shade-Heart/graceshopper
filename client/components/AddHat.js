import React from 'react'
import {connect} from 'react-redux'
import {postHats} from '../store/allHatsReducer'

class AddHat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      category: '',
      size: '',
      buttonDisable: true,
      nameWarning: false,
      addressWarning: false,
      toggle: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.postHats(this.state)
    this.setState({
      name: '',
      description: '',
      category: '',
      size: ''
    })
  }
  onClick() {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  render() {
    return (
      <div>
        <div>
          {this.props.isAdmin ? (
            this.state.toggle ? (
              <button onClick={() => this.onClick()}>Hide Add Hat</button>
            ) : (
              <button onClick={() => this.onClick()}>Add Hat</button>
            )
          ) : (
            <h2 />
          )}
        </div>
        {this.state.toggle && (
          <form onSubmit={this.handleSubmit}>
            <label>
              Hat Name:
              <input
                type="text"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
                required
              />
            </label>

            <label>
              Hat Description:
              <input
                type="text"
                name="description"
                onChange={this.handleChange}
                value={this.state.description}
                required
              />
            </label>

            <label>
              Hat Category:
              <select
                name="category"
                onChange={this.handleChange}
                value={this.state.category}
                required
              >
                <option value="">--</option>
                <option value="Classy">Classy</option>
                <option value="Rancher">Rancher</option>
                <option value="Hipster">Hipster</option>
              </select>
            </label>

            <label>
              Hat Size:
              <select
                name="size"
                onChange={this.handleChange}
                value={this.state.size}
                required
              >
                <option value="">--</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
              </select>
            </label>

            <div id="submitButton">
              <button type="submit">Submit New Hat</button>
            </div>
          </form>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postHats: hats => dispatch(postHats(hats))
  }
}

export default connect(null, mapDispatchToProps)(AddHat)
