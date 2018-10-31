import React from 'react'

/**
 * COMPONENT
 */
const SmallForm = () => {
  return (
    <div>
      <div>
        <label htmlFor="email">
          <small>Email</small>
        </label>
        <input name="email" type="text" />
      </div>
      <div>
        <label htmlFor="password">
          <small>Password</small>
        </label>
        <input name="password" type="password" />
      </div>
    </div>
  )
}

export default SmallForm
