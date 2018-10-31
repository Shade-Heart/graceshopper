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
    console.log(this.props)
    let allHats = this.props.allHats
    if (allHats.length !== 0 && this.state.query !== '') {
      allHats = allHats.filter(hat =>
        hat.name.toLowerCase().includes(this.state.query.toLowerCase())
      )
    }
    return (
      <div>
        <div>
          <AddHat />
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
              <div>
                <li key={hat.id}>
                  {' '}
                  <a href="#" />
                  <Link to={`/Hats/${hat.id}`}>{hat.name} </Link>
                  <button onClick={() => this.props.deleteHat(hat.id)}>
                    {' '}
                    Remove Hat{' '}
                  </button>
                </li>
              </div>
            )
          })}
        </ul>
      </div>
    )
  }
}
