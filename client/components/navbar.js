import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Label} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn, firstName, email}) => (
  <div>
    {/* <h1>GRACE SHOPPER</h1> */}
    {/* <nav> */}
    {isLoggedIn ? (
      <div>
        <header>
          <div className="navWrapper" id="home">
            <div className=" clearfix">
              <h2 className="companyName">Mad Hatter</h2>
              <nav className="mainNav clearfix">
                <ul>
                  <li>
                    <Link to="/home">Home</Link>
                  </li>
                  <li>
                    <Link to="/hats">All Products</Link>
                  </li>
                  <li>
                    <Link to="/myaccount">Account</Link>
                    {/* <Link to="/myaccount">{`${firstName}'s Account`}</Link> */}
                  </li>
                  {email ? (
                    <li>
                      <a href="/login" onClick={handleClick}>
                        Logout
                      </a>
                    </li>
                  ) : (
                    <li>
                      <a href="/signup" onClick={handleClick}>
                        Sign Up
                      </a>
                    </li>
                  )}
                  <li>
                    <Link to="/cart">Cart</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
      </div>
    ) : (
      <div>
        {/* The navbar will show these links before you log in */}

        <header>
          <div className="navWrapper" id="home">
            <div className=" clearfix">
              <h2 className="companyName">Mad Hatter</h2>
              <nav className="mainNav clearfix">
                <ul>
                  <li>
                    <Link to="/home">Home</Link>
                  </li>
                  <li>
                    <Link to="/hats">All Products</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Sign Up</Link>
                  </li>
                  <li>
                    <a>Not a cart</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
      </div>
    )}
    {/* </nav> */}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    firstName: state.user.firstName,
    email: !!state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
