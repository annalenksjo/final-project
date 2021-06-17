import React from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import { StyledButton } from './Button';


export const Nav = styled.nav`
background: #90e0ef;
position: fixed;
top: 0;
left: 0;
height: 120px;
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
z-index: 1;
border-radius: 0 0 30px 30px; 
padding: 0 60px 0 80px;
`;

export const NavLink = styled(Link)`
color: #0077b6;
display: flex;
align-items: center;
text-decoration: none;
font-size: 25px;
padding: 0 1rem;
height: 100%;
cursor: pointer;
&.active {
	color: #03045e;
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

export const Logo = styled.h1`
font-size: 50px;
color: #0077b6;
`

export const NavBar = () => {

  const onLogOut = () => {
    localStorage.clear()
  }

  return (
      <Nav>
        <Logo>Fågelspaning</Logo>
         <LinkContainer>
          <NavLink to='/profile' exact>
            Profil
          </NavLink>
          <NavLink to='/toplist' exact >
            Topplista
          </NavLink>
          <NavLink to='/tradgardsfaglar' exact>
            Fågelarter
          </NavLink>
          <NavLink onClick={onLogOut} to='/'>Logga ut</NavLink>
        </LinkContainer>
      </Nav>
  )
}