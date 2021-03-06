import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import SmallForm from './SmallForm'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="bgPages">
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' ? (
          <div>
            <div className="form">
              <ul className="tab-group">
                <li>
                  <a className="active1" href="/signup">
                    Sign up
                  </a>
                </li>
                <li>
                  <a href="/login">Login</a>
                </li>
              </ul>

              <div className="tab-content">
                <div className="field-wrap">
                  <label htmlFor="firstName">
                    <small>
                      First Name<span>*</span>
                    </small>
                  </label>
                  <input name="firstName" type="text" />
                </div>

                <div className="field-wrap">
                  <label htmlFor="lastName">
                    <small>
                      Last Name<span>*</span>
                    </small>
                  </label>
                  <input name="lastName" type="text" />
                </div>

                <div className="field-wrap">
                  <label htmlFor="email">
                    <small>
                      Email<span>*</span>
                    </small>
                  </label>
                  <input name="email" type="text" />
                </div>

                <div className="field-wrap">
                  <label htmlFor="password">
                    <small>
                      Password<span>*</span>
                    </small>
                  </label>
                  <input name="password" type="password" />
                </div>
              </div>
              <button>{displayName}</button>
              <a href="/auth/google">{displayName} with Google</a>
            </div>
          </div>
        ) : (
          <div className="bgPages">
            <div className="form">
              <ul className="tab-group">
                <li>
                  <a className="active1" href="/signup">
                    Sign up
                  </a>
                </li>
                <li>
                  <a href="/login">Login</a>
                </li>
              </ul>

              <div className="tab-content">
                <div className="field-wrap">
                  <label htmlFor="email">
                    <small>Email</small>
                  </label>
                  <input name="email" type="text" />
                </div>

                <div className="field-wrap">
                  <label htmlFor="password">
                    <small>Password</small>
                  </label>
                  <input name="password" type="password" />
                </div>
              </div>
              <button>{displayName}</button>
              <a href="/auth/google">{displayName} with Google</a>
            </div>
          </div>
        )}
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (formName === 'signup') {
        const firstName = evt.target.firstName.value
        const lastName = evt.target.lastName.value
        dispatch(auth(email, password, formName, firstName, lastName))
      } else {
        dispatch(auth(email, password, formName))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}

{
  /* <div className="bgPages">
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' ? (
          <div>
            <div>
              <label htmlFor="firstName">
                <small>First Name</small>
              </label>
              <input name="firstName" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">
                <small>Last Name</small>
              </label>
              <input name="lastName" type="text" />
            </div>
          </div>
        ) : (
          <h2 />
        )}
        <SmallForm />
        <div>
          <Button type="submit" color="blue" fluid size="large">
            {displayName}
          </Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div> */
}
