import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, activeStyle, NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

import user from '../reducers/user'
import { HamburgerMenu } from './HamburgerMenu'

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  padding: 0 20px 0 20px;
  background-color: #FAE5A2;

  @media (min-width: 768px) {
    height: 140px;
    padding: 0 60px 0 80px;
  }
`;

export const StyledNavLink = styled(NavLink)`
  color: #0C4458;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 25px;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &:hover {
    color: #03045e;
  } 
`;


export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: 10px;
`;

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
    localStorage.clear()
  }

  return (
      <Nav>
        <Logo src="https://res.cloudinary.com/mittbildmoln/image/upload/v1623943290/Blames_med_titel_adxxiz.png"></Logo>
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