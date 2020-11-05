import React, { useState } from 'react'
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom'

import { Collage } from './collage'
import { Login } from './login'

const HomePage: React.FC<RouteComponentProps> = (props) => {
  const [user, setUser] = useState('')
  const [didSubmit, setDidSubmit] = useState(false)

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUser(e.target.value)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDidSubmit(true)
  }

  return didSubmit ? (
    <Redirect to={{ ...props.location, pathname: `/collage?user=${user}` }} />
  ) : (
    <Login
      handleSubmit={handleSubmit}
      handleUsernameChange={handleUsernameChange}
    />
  )
}

export default withRouter(HomePage)
