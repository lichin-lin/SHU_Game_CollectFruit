import React from 'react'
import firebase from 'firebase'
import Login from './Login'
import Swiper from 'react-id-swiper'
import styled from 'styled-components'
import Cookies from 'universal-cookie'

import { Link } from 'react-router-dom'

const Cell = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${prop => prop.bgSrc ? prop.bgSrc : ''});
  background-repeat: no-repeat;
  background-size: contain;

  color: white;

  display: flex;
  align-items: center;
  justify-content: center;
`
const Button = styled.div`
  width: auto;
  min-width: 200px;
  background-color: #89d8d3;
  background-image: ${props => props.color};
  padding: 10px 25px;

  border-color: #e1fff0;
  border-radius: 5px;
  color: #50514F;
  font-size: 24px;
  outline: none;

  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.25s ease;

  > a {
    text-decoration: none;
    color: #50514F;
  }
`
export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.swiper = null
  }

  state = {
    user: null,
    isLoading: true,
    isLogin: false,
    noSwiping: true
  }
  onSwipe = () => {
    this.setState({noSwiping: false})
    if (this.swiper) this.swiper.slideNext()
  }

  componentWillMount () {
    const cookies = new Cookies()
    let checkUser = cookies.get('user')

    if (checkUser !== null && checkUser !== undefined) {
      let userInfo = {
        data: checkUser.user,
        accessToken: checkUser.accessToken
      }
      this.setState({user: userInfo, isLogin: true})
      this.setState({isLoading: false})
    } else {
      firebase.auth().getRedirectResult()
      .then((result) => {
        if (result.credential) {
          let userInfo = {
            data: result.user,
            accessToken: result.credential.accessToken
          }
          this.setState({user: userInfo, isLogin: true})

          const date = new Date()
          date.setHours(date.getHours() + 1)
          cookies.set('user', userInfo, {expires: date})
        }
        this.setState({isLoading: false})
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  render () {
    const params = {
      navigation: {
        // nextEl: '.swiper-button-next',
        // prevEl: '.swiper-button-prev'
      }
    }
    return (
      <Swiper
        {...params}
        ref={node => this.swiper = node !== null ? node.swiper : null }
        noSwiping={this.state.noSwiping}>
        <Cell>
          <Login isLoading={this.state.isLoading} isLogin={this.state.isLogin} onSwipe={this.onSwipe}/>
        </Cell>
        <Cell bgSrc={require(`../../assets/images/bg2.png`)} />
        <Cell bgSrc={require(`../../assets/images/bg3.png`)} />
        <Cell bgSrc={require(`../../assets/images/bg4.png`)} />
        <Cell bgSrc={require(`../../assets/images/bg5.png`)} >
          <Button color={'linear-gradient(315deg, #F3F599 0%, #F3F599 74%)'}>
            <Link to="/game">開始遊戲</Link>
          </Button>
        </Cell>
      </Swiper>
    )
  }
}
