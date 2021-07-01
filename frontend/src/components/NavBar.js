import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

import user from '../reducers/user'
import { HamburgerMenu } from './HamburgerMenu'
import { Logotype } from './Logotype'

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  padding: 0 20px 0 10px;
  background-color: #FAE5A2;

  @media (min-width: 768px) {
    height: 100px;
    padding: 0 40px 0 0px;
  }
  @media (min-width: 1024px) {
    height: 140px;
    padding: 0 20px 0 0px;
  }
  @media (min-width: 1440px) {
    height: 160px;
    padding: 0 80px 0 60px;
  }
`

export const StyledNavLink = styled(NavLink)`
  color: #0C4458;
  font-family: 'Quicksand', sans-serif;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 25px;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  @media (min-width: 1440px) {
    font-size: 28px;
  }
`

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: 10px;
`

export const LinkContainer = styled.div`
display: none;
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: row;
  }
`

export const Logo = styled.img`
  width: 200px;
  @media (min-width: 768px) {
    width: 250px;
  }
`

export const NavBar = () => {
  const dispatch = useDispatch()

  const onLogOut = () => {
    dispatch(user.actions.setloggedInUser(null))
    dispatch(user.actions.setAccessToken(null))
    dispatch(user.actions.setUserMessage(null))
    localStorage.clear()
  }

  return (
      <Nav>
        <Logotype />
         <HamburgerMenu/>
         <LinkContainer>
          <StyledNavLink to='/minsida' activeStyle={{
            fontWeight: 'bold'
          }}>
            Min sida
          </StyledNavLink>
          <StyledNavLink to='/topplistan' activeStyle={{
            fontWeight: 'bold'
          }}>
            Topplistan
          </StyledNavLink>
          <StyledNavLink to='/fagelbiblioteket' activeStyle={{
            fontWeight: 'bold'
          }}>
            Fågelbiblioteket
          </StyledNavLink>
          <StyledNavLink onClick={onLogOut} to='/'>Logga ut</StyledNavLink>
        </LinkContainer>
      </Nav>
  )
}