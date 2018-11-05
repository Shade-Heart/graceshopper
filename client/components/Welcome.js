import React from 'react'
import {Link} from 'react-router-dom'

const Welcome = props => {
  const {user} = props
  return (
    <div id="welcome" className="welcome">
      <main>
        <header>
          <section className="hero">
            <div className="innerWrapper">
              <h2>Welcome {user}</h2>
              <h1>Welcome to the Mad Hatter</h1>
              <h3>Find the right look for you!</h3>
            </div>
          </section>
        </header>
      </main>
    </div>
  )
}

export default Welcome
