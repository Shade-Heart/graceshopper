import React from 'react'
import {Link} from 'react-router-dom'
import AddHat from './AddHat'

export default class AllHats extends React.Component {
  componentDidMount() {
    this.props.loadHats()
  }

  render() {
    console.log(this.props)
    const allHats = this.props.allHats
    return (
      <div>
        <div>
          <AddHat />
        </div>
        <ul className="list-unstyled">
          {allHats.map(hat => {
            return (
              <li key={hat.id}>
                {' '}
                <a href="#" />
                <Link to={`/Hats/${hat.id}`}>{hat.name} </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
