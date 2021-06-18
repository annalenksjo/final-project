import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 140px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  padding: 0 60px 0 80px;
  background-color: #FAE5A2;
`;

export const NavLink = styled(Link)`
  color: #0C4458;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 25px;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &:active {
    font-weight: bold;
  }
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
  display: flex;
  flex-direction: row;
`

export const Logo = styled.img`
  width: 350px;
`

export const NavBar = () => {

  const onLogOut = () => {
    localStorage.clear()
  }

  return (
      <Nav>
        <Logo src="https://res.cloudinary.com/mittbildmoln/image/upload/v1623943290/Blames_med_titel_adxxiz.png"></Logo>
         <LinkContainer>
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
        </LinkContainer>
      </Nav>
  )
}