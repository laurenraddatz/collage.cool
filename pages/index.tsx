import React, { useState } from 'react'
import { Router, useRouter } from 'next/router'
import Head from 'next/head'
import styled from '@emotion/styled'

import { Collage } from '../src/components/collage'
import { Login } from '../src/components/login'

export const Main = styled.div`
  background-color: white;
  font-family: sans-serif;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin: 0;
  min-height: 100vh;
`

const Home = () => {
  const [user, setUser] = useState('')
  const router = useRouter()

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUser(e.target.value)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/collage?user=${user}`)
  }

  return (
    <Main>
      <Head>
        <title>collage.cool</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Login
        handleSubmit={handleSubmit}
        handleUsernameChange={handleUsernameChange}
      />
    </Main>
  )
}

export default Home
