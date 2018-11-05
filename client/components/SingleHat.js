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
        <main className="singleHatContainer">
          <aside className="right">
            <a>{hat.category}</a>
            <h1>{hat.name}</h1>
            <h4>{`Size: ${hat.size}`}</h4>
            <h2>${(hat.price / 100).toFixed(2)}</h2>
            <article id="description">
              <p>{hat.description}</p>
            </article>
            {/* <button onClick={this.hatSpeak}>Click for sound!</button> */}
            {/* <br /> */}
            <div>
              <AddToCart productId={hat.id} />
            </div>
          </aside>
          <aside className="left">
            <div className="backToList">
              <Link to="/hats">
                <p>Back to All Products</p>
              </Link>
            </div>
            <img className="singleProductImage" src={`/${hat.productImg}`} />
          </aside>
        </main>
        <div className="adminOp">
          <h1>Admin Options:</h1>
          <EditHat
            hatId={hat.id}
            renderUpdatedHat={this.renderUpdatedHat}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleHat: state.singleHat.singleHat,
    defaultUser: state.user,
    allOrders: state.orderReducer.allOrders
  }
}
const mapDispatch = dispatch => {
  return {
    loadHat: id => dispatch(loadHat(id))
  }
}

export default connect(mapState, mapDispatch)(SingleHat)

{
  /* <div>
        <h2>{hat.name}</h2>
        <h3>{hat.category}</h3>
        <h4>{hat.description}</h4>
        <h4>{`$${hat.price / 100}`}</h4>
        <h4>{`Size${hat.size}`}</h4>
        <div>
          <img className="singleProductImage" src={`/${hat.productImg}`} />
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
      </div> */
}
