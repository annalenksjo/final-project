import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import user from '../reducers/user'
import { Main } from '../components/MainContainer'
import { Logotype } from '../components/Logotype'
import { Nav, Logo, StyledNavLink } from '../components/NavBar'

const HamburgerMenuMain = styled(Main)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 150px 0 180px 0;
  @media(min-width: 768px) {
    padding: 240px 0 180px 0;
  }
`

const CloseCross = styled.img`
  width: 30px;
  :hover {
    cursor: pointer;
  }
  @media (min-width: 768px) {
    width: 40px;
  }
`

const LinkDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-items: center;
`

const HamburgerNavLink = styled(StyledNavLink)`
  margin: 20px 0;
  @media (min-width: 768px) {
    font-size: 30px;
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
        <Logotype />
        <CloseCross onClick={() => history.go(-1)} src="https://res.cloudinary.com/mittbildmoln/image/upload/v1624115424/cross_msucvi.png"></CloseCross>
      </Nav>
      <LinkDiv>
        <HamburgerNavLink to='/minsida'>
            Min sida
          </HamburgerNavLink>
          <HamburgerNavLink to='/topplistan' >
            Topplistan
          </HamburgerNavLink>
          <HamburgerNavLink to='/fagelbiblioteket'>
            Fågelbiblioteket
          </HamburgerNavLink>
          <HamburgerNavLink onClick={onLogOut} to='/'>Logga ut</HamburgerNavLink>¨
          </LinkDiv>
    </HamburgerMenuMain>
  )
}