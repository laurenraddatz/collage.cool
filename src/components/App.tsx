import React, { useCallback, useState } from 'react'
import styled from '@emotion/styled'

import { Collage } from './collage'
import { Login } from './login'

const LASTFM_API_KEY = process.env.LASTFM_API_KEY

const Main = styled.div`
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

const App = () => {
  const [user, setUser] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState([])

  // change later or automatically determine
  const size = 4
  const period = '7day'
  // change limit if needed
  const url = `http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${user}&api_key=${LASTFM_API_KEY}&period=${period}&format=json`

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUser(e.target.value)

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      fetch(url)
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true)
            setData(result.topalbums.album)
          },
          (error) => {
            setIsLoaded(false)
            setError(error)
          }
        )
    },
    [url]
  )

  return (
    <Main>
      {!isLoaded ? (
        <Login
          handleSubmit={handleSubmit}
          handleUsernameChange={handleUsernameChange}
        />
      ) : (
        <Collage albums={data} />
      )}
    </Main>
  )
}

export default App
