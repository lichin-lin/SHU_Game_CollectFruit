import React from 'react';
import { Route } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const Main = styled.main`
  width: calc(100vh * 9 / 16);
  height: 100vh;

  @supports (-webkit-overflow-scrolling: touch) {
    width: calc((100vh - 64px) * 9 / 16);
    height: calc(100vh - 84px);
  }
`

const App = () => (
  <Wrapper>
    {/* <header>
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
    </header> */}

    <Main id="main">
      <Route exact path="/" component={Home} />
      <Route exact path="/game" component={About} />
    </Main>
  </Wrapper>
)

export default App;
