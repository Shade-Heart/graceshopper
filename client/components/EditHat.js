import React from 'react'
import {connect} from 'react-redux'
import {editedHats} from '../store/allHatsReducer'
const defaultState = {
  name: '',
  description: '',
  category: '',
  size: '',
  buttonDisable: true,
  toggle: false
}
class EditHat extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState

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
    const body = () => {
      let modifiedHat = {}
      if (this.state.name !== defaultState.name) {
        modifiedHat.name = this.state.name
      }
      if (this.state.description !== defaultState.description) {
        modifiedHat.description = this.state.description
      }
      if (this.state.size !== defaultState.size) {
        modifiedHat.size = this.state.size
      }
      if (this.state.category !== defaultState.category) {
        modifiedHat.category = this.state.category
      }
      return modifiedHat
    }
    this.props.editedHats(this.props.hatId, body())
    this.props.renderUpdatedHat()
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
            <div className="adminOp">
              <h1>Admin Options:</h1>
              {this.state.toggle ? (
                <button onClick={() => this.onClick()}>Hide Edit Hat</button>
              ) : (
                <button onClick={() => this.onClick()}>Edit Hat</button>
              )}
            </div>
          ) : (
            <h2 />
          )}
        </div>
        {this.state.toggle && (
          <div className="adminOP">
            <form onSubmit={this.handleSubmit}>
              <label>
                Hat Name:
                <input
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                />
              </label>

              <label>
                Hat Description:
                <input
                  type="text"
                  name="description"
                  onChange={this.handleChange}
                  value={this.state.description}
                />
              </label>

              <label>
                Hat Category:
                <select
                  name="category"
                  onChange={this.handleChange}
                  value={this.state.category}
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
                >
                  <option value="">--</option>
                  <option value="S">Small</option>
                  <option value="M">Medium</option>
                  <option value="L">Large</option>
                </select>
              </label>

              <div id="submitButton">
                <button type="submit">Edit Hat</button>
              </div>
            </form>
          </div>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editedHats: (id, modifiedHat) => dispatch(editedHats(id, modifiedHat))
  }
}

export default connect(null, mapDispatchToProps)(EditHat)
