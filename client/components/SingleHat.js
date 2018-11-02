import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import EditHat from './EditHat'
import AddToCart from './AddToCart'
import {loadHat} from '../store/singleHatReducer'
import {connect} from 'react-redux'

export class SingleHat extends Component {
  constructor(props) {
    super(props)
    this.hatSpeak = this.hatSpeak.bind(this)
    this.renderUpdatedHat = this.renderUpdatedHat.bind(this)
  }
  componentDidMount() {
    this.props.loadHat(this.props.match.params.id)
  }

  renderUpdatedHat() {
    this.props.loadHat(this.props.match.params.id)
  }

  hatSpeak() {
    const msg = new SpeechSynthesisUtterance(this.props.singleHat.name)
    window.speechSynthesis.speak(msg)
  }

  render() {
    const hat = this.props.singleHat
    const defaultUser = this.props.defaultUser
    // const userId = !!(defaultUser !== {} ? defaultUser.id : 1)// chage this for the session afterwards
    const isAdmin = !!(defaultUser !== {} && defaultUser.isAdmin)
    return (
      <div>
        <h2>{hat.name}</h2>
        <h3>{hat.category}</h3>
        <h4>{hat.description}</h4>
        <h4>{`$${hat.price / 100}`}</h4>
        <h4>{`Size${hat.size}`}</h4>
        <div>
          <img src={`/${hat.productImg}`} />
          <AddToCart productId={hat.id} />
        </div>
        <button onClick={this.hatSpeak}>Click for sound!</button>
        <br />
        <EditHat
          hatId={hat.id}
          renderUpdatedHat={this.renderUpdatedHat}
          isAdmin={isAdmin}
        />
        <Link to="/hats"> Back to List! </Link>
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleHat: state.singleHat.singleHat,
    defaultUser: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    loadHat: id => dispatch(loadHat(id))
  }
}

export default connect(mapState, mapDispatch)(SingleHat)
