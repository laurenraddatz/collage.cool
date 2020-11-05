import React from 'react'
import styled from '@emotion/styled'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import CollagePage from './collagePage'
import HomePage from './homePage'

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
  return (
    <Router>
      <Main>
        <Switch>
          <>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/collage?user=:user" component={CollagePage} />
          </>
        </Switch>
      </Main>
    </Router>
  )
}

export default App
