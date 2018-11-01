import React from 'react'
import {Link} from 'react-router-dom'
import AddHat from './AddHat'

export default class AllHats extends React.Component {
  state = {
    query: ''
  }

  componentDidMount() {
    this.props.loadHats()
  }

  handleChange(event) {
    this.setState({
      query: event.target.value
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
