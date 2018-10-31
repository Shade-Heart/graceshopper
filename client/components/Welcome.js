import React from 'react'
import {Link} from 'react-router-dom'

const Welcome = () => {
  return (
    <div id="welcome" className="welcome">
      <main>
        <h1>Welcome to the Mad Hatter</h1>
        <Link to="/hats"> Browse our products </Link>

        <img
          src="https://cdn.shopify.com/s/files/1/0157/8796/t/6/assets/slideshow_2.jpg?7715386223625535679"
        />
      </main>
    </div>
  )
}

export default Welcome
