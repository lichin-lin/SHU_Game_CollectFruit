import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  fblogin
} from '../../modules/session'

const mapDispatchToProps = dispatch => bindActionCreators({
  fblogin
}, dispatch)

const mapStateToProps = state => ({
  account: state.session.account
})

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background: #e1fff0;

  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
const Header = styled.div``
const Body = styled.div`
  width: 100vw;
  max-width: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 70px;
    margin: 0 0 10px 0;
    background-color: #89d8d3;
    background-image: ${props => props.color}
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  h3 {
    font-size: 20px;
    background-color: #89d8d3;
    background-image: ${props => props.color}
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  button {
    width: 100%;
    background-color: #89d8d3;
    background-image: ${props => props.color}
    padding: 20px 25px;

    border-color: #e1fff0;
    border-radius: 50px;
    color: white;
    font-size: 16px;
    outline: none;
  }
`

const Seperator = styled.div`
  width: 100%;
  height: 5px;
  background: pink;
`
const Footer = styled.img`
  width: 100%;
  height: auto;
`
class Login extends React.Component {
  render () {
    return (
      <Container>
        <Header></Header>
        <Body color={'linear-gradient(315deg, #f6fba2 0%, #20ded3 74%);'}>
          <h2>一起認識水果們吧!</h2>
          <button onClick={this.props.fblogin}>
            使用 facebook 登入
          </button>
          <h3>#世新大學 #公共關係</h3>
        </Body>
        <Footer src={require('./../../assets/images/footer.png')}/>
      </Container>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
