import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class SingleHat extends Component {
  constructor() {
    super()
    this.hatSpeak = this.hatSpeak.bind(this)
  }
  componentDidMount() {
    this.props.loadHat(this.props.match.params.id)
  }

  hatSpeak() {
    const msg = new SpeechSynthesisUtterance(this.props.singleHat.name)
    window.speechSynthesis.speak(msg)
  }

  render() {
    const hat = this.props.singleHat
    return (
      <div>
        <h2>{hat.name}</h2>
        <div>
          <img src={hat.productImg} />
        </div>
        <button onClick={this.hatSpeak}>Click for sound!</button>
        <br />
        <Link to="/hats"> Back to List! </Link>
      </div>
    )
  }
}
