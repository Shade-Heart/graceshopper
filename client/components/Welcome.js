import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Welcome extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const defaultUser = this.props.defaultUser
    const isLoggedin = !!defaultUser

    const displayName = isLoggedin ? defaultUser.name : ''

    return (
      <div id="welcome" className="welcome">
        <main>
          <header>
            <section className="hero">
              <div className="innerWrapper">
                {this.props.isLoggedin ? (
                  <h2>Welcome {displayName}</h2>
                ) : (
                  <h2>Welcome</h2>
                )}
                <h1>Welcome to the Mad Hatter</h1>
                <h3>Find the right look for you!</h3>
              </div>
            </section>
          </header>
        </main>
      </div>
    )
  }
}

export default Welcome
