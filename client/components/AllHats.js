import React from 'react'
import {Link} from 'react-router-dom'
import AddHat from './AddHat'
import {connect} from 'react-redux'
import {loadHats, removeHats} from '../store/allHatsReducer'

export class AllHats extends React.Component {
  state = {
    query: '',
    selected: ''
  }

  componentDidMount() {
    this.props.loadHats()
  }

  handleChange(event) {
    this.setState({
      query: event.target.value
    })
  }

  handleFilter(event) {
    this.setState({
      selected: event.target.value
    })
  }

  render() {
    const defaultUser = this.props.defaultUser
    const isAdmin = !!(defaultUser !== {} && defaultUser.isAdmin)
    let allHats = this.props.allHats
    if (allHats.length !== 0 && this.state.query !== '') {
      allHats = allHats.filter(hat =>
        hat.name.toLowerCase().includes(this.state.query.toLowerCase())
      )
    }

    if (this.state.selected !== '') {
      allHats = allHats.filter(hat => hat.category === this.state.selected)
    }

    return (
      <div>
        <div>
          <AddHat isAdmin={isAdmin} />
          <input
            type="text"
            placeholder="Search hats"
            onChange={this.handleChange.bind(this)}
            value={this.state.query}
          />
        </div>

        <div>
          <select onChange={this.handleFilter.bind(this)}>
            <option value=""> -- </option>
            <option value="Hipster">Hipster</option>
            <option value="Rancher">Rancher</option>
          </select>
        </div>

        <ul className="list-unstyled">
          {allHats.map(hat => {
            return (
              <li key={hat.id}>
                {' '}
                <a href="#" />
                <Link to={`/Hats/${hat.id}`}>{hat.name} </Link>
                {isAdmin ? (
                  <button onClick={() => this.props.deleteHat(hat.id)}>
                    {' '}
                    Remove Hat{' '}
                  </button>
                ) : (
                  <h2 />
                )}{' '}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    allHats: state.allHats.allHats,
    defaultUser: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    loadHats: () => dispatch(loadHats()),
    deleteHat: id => dispatch(removeHats(id))
  }
}

export default connect(mapState, mapDispatch)(AllHats)
