import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ReactLoading from 'react-loading'

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
    font-size: 56px;
    margin: 0 0 10px 0;
    background-color: #89d8d3;
    background-image: ${props => props.color}
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  h3 {
    font-size: 16px;
    background-color: #89d8d3;
    background-image: ${props => props.color}
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  > button {
    width: 90%;
    background-color: #89d8d3;
    background-image: ${props => props.color}
    padding: 20px 25px;

    border-color: #e1fff0;
    border-radius: 50px;
    color: white;
    font-size: 20px;
    outline: none;

    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const Footer = styled.img`
  width: 100%;
  height: auto;
`
class Login extends React.Component {
  state = {
    // isLoading: false
  }
  onLogin = () => {
    this.props.fblogin()
  }
  render () {
    return (
      <Container>
        <Header></Header>
        <Body color={'linear-gradient(315deg, #f6fba2 0%, #20ded3 74%);'}>
          <h2>豐狂接果乾</h2>
          <button onClick={this.props.isLogin ? this.props.onStartGame : this.props.fblogin}>
            {
              this.props.isLoading ? (
                <ReactLoading type={'spin'} color={'white'} height={30} width={30} />
              ) : (
                this.props.isLogin ? `開始遊戲` : `使用 facebook 登入`
              )
            }
          </button>
          <h3>{this.props.isLogin ? `#2018世新公廣展 #MooJu目啾整合行銷` : ``}</h3>
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
