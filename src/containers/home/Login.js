import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ReactLoading from 'react-loading'

import { fblogin } from '../../modules/session'

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fblogin,
    },
    dispatch
  )

const mapStateToProps = state => ({
  account: state.session.account,
})

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background: #e1fff0;

  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background-image: url(${prop => (prop.bgSrc ? prop.bgSrc : '')});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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
  > div {
    width: auto;
    min-width: 200px;
    background-color: #89d8d3;
    background-image: ${props => props.color};
    padding: 10px 25px;

    border-color: #e1fff0;
    border-radius: 5px;
    color: white;
    font-size: 24px;
    outline: none;

    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    transition: all 0.25s ease;
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
  render() {
    return (
      <Container bgSrc={require(`../../assets/images/bg1.png`)}>
        <Header />
        <Body color={'linear-gradient(315deg, #485993 0%, #485993 74%);'}>
          <div
            onClick={
              this.props.isLogin ? this.props.onSwipe : this.props.fblogin
            }
          >
            {this.props.isLoading ? (
              <ReactLoading
                type={'spin'}
                color={'white'}
                height={30}
                width={30}
              />
            ) : this.props.isLogin ? (
              `開始介紹遊戲`
            ) : (
              `使用 facebook 登入`
            )}
          </div>
          {/* <h3>{this.props.isLogin ? `#2018世新公廣展 #MooJu目啾整合行銷` : ``}</h3> */}
        </Body>
        <Footer />
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
