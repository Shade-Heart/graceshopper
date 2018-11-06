import React from 'react'
import {Link} from 'react-router-dom'
import AddHat from './AddHat'
import {connect} from 'react-redux'
import {loadHats, removeHats} from '../store/allHatsReducer'
import {Dropdown, Icon, Input, Image, Container} from 'semantic-ui-react'
import {updateOrder} from './../store/orderReducer'

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
      <div className="bgPages">
        {/* Filter By Name and Category */}
        <div className="ui segment">
          <div className="ui two column very relaxed grid">
            <div className="column center aligned">
              <Input
                icon={<Icon name="search" inverted circular link />}
                placeholder="Name"
                onChange={this.handleChange.bind(this)}
                centered="true"
              />
            </div>
            <div className="column center aligned">
              <Dropdown
                clearable
                options={options}
                selection
                onChange={this.handleFilter.bind(this)}
                placeholder="Category"
              />
            </div>
          </div>
          <div className="ui vertical divider">FILTER BY:</div>
        </div>

        <AddHat isAdmin={isAdmin} />

        {/* Product Listings */}
        <Container>
          <div className="ui four column grid">
            {allHats.map(hat => {
              return (
                <div className="column" key={hat.id}>
                  <div className="ui segment" style={{height: 350}}>
                    <Image
                      src={`/${hat.productImg}`}
                      size="large"
                      centered
                      href={`/Hats/${hat.id}`}
                    />
                    <Link to={`/Hats/${hat.id}`}>
                      {' '}
                      <p
                        className="ui segment center blue inverted"
                        style={{
                          height: 80,
                          textAlign: 'center',
                          fontSize: 18,
                          margin: 'auto'
                        }}
                      >
                        {hat.name}
                      </p>{' '}
                    </Link>

                    {isAdmin ? (
                      <button onClick={() => this.props.deleteHat(hat.id)}>
                        {' '}
                        Remove Hat{' '}
                      </button>
                    ) : (
                      <h2 />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </div>
    )
  }
}

const mapState = state => {
  return {
    allHats: state.allHats.allHats,
    defaultUser: state.user,
    id: state.user.id
  }
}
const mapDispatch = dispatch => {
  return {
    loadHats: () => dispatch(loadHats()),
    deleteHat: id => dispatch(removeHats(id)),
    editOrder: id => dispatch(updateOrder(id))
  }
}

export default connect(mapState, mapDispatch)(AllHats)
