import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import user from '../reducers/user'
import { Main } from '../components/MainContainer'
import { Nav, Logo, NavLink } from '../components/NavBar'

const HamburgerMenuMain = styled(Main)`
 display: flex;
 flex-direction: column;
 align-items: center;
 height: 100vh;
 padding: 180px 0 180px 0;
`
const CloseCross = styled.img`
width: 30px;
:hover {
  cursor: pointer;
}
`

export const HamburgerMenuOpen = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const onLogOut = () => {
    dispatch(user.actions.setloggedInUser(null))
    localStorage.clear()
  }

  return (
    <HamburgerMenuMain>
      <Nav>
        <Logo src="https://res.cloudinary.com/mittbildmoln/image/upload/v1623943290/Blames_med_titel_adxxiz.png"></Logo>
        <CloseCross onClick={() => history.go(-1)} src="https://res.cloudinary.com/mittbildmoln/image/upload/v1624115424/cross_msucvi.png"></CloseCross>
      </Nav>
      <NavLink to='/minsida'>
            Min sida
          </NavLink>
          <NavLink to='/topplistan' >
            Topplistan
          </NavLink>
          <NavLink to='/fagelbiblioteket'>
            Fågelbiblioteket
          </NavLink>
          <NavLink onClick={onLogOut} to='/'>Logga ut</NavLink>
    </HamburgerMenuMain>

  )
}