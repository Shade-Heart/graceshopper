import React from 'react'
import {Link} from 'react-router-dom'
import AddHat from './AddHat'
import {connect} from 'react-redux'
import {loadHats, removeHats} from '../store/allHatsReducer'
import {Dropdown, Icon, Input, Image} from 'semantic-ui-react'

export class AllHats extends React.Component {
  state = {
    query: '',
    selected: ''
  }

  componentDidMount() {
    this.props.loadHats()
  }

  handleChange(event, data) {
    this.setState({
      query: data.value
    })
  }

  handleFilter(event, data) {
    this.setState({
      selected: data.value
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

    const options = [
      {key: 1, text: 'Hipster', value: 'Hipster'},
      {key: 2, text: 'Rancher', value: 'Rancher'},
      {key: 3, text: 'Classy', value: 'Classy'}
    ]

    return (
      <div>
        <div>
          <AddHat isAdmin={isAdmin} />
          <Input
            icon={<Icon name="search" inverted circular link />}
            placeholder="Search Hats"
            onChange={this.handleChange.bind(this)}
          />
        </div>

        <div>
          <Dropdown
            clearable
            options={options}
            selection
            onChange={this.handleFilter.bind(this)}
            placeholder="Filter by Hats"
          />
        </div>

        <ul className="list-unstyled">
          {allHats.map(hat => {
            return (
              <li key={hat.id}>
                <Image
                  src="./DefaultHat.jpg"
                  size="medium"
                  bordered
                  href={`/Hats/${hat.id}`}
                />
                <Link to={`/Hats/${hat.id}`}>{hat.name} </Link>
                {isAdmin ? (
                  <button onClick={() => this.props.deleteHat(hat.id)}>
                    {' '}
                    Remove Hat{' '}
                  </button>
                ) : (
                  <h2 />
                )}
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
