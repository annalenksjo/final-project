import React from 'react'
import { NavLink as Link } from 'react-router-dom'

import styled from 'styled-components'


// const StyledNavBar = styled.nav`
//     width: 100%;
//     background-color: white;
// `

// const Container = styled.div`
//     max-width: 1200px;
//     margin: auto;
//     padding: 1rem;
//     display: flex;
//     align-items: center;
//     justify-content: space-evenly;
//     flex-wrap: wrap;
// `

export const Nav = styled.nav`
background: #DE6E4B;
height: 100px;
display: flex;
justify-content: space-between;
padding: 0.2rem calc((100vw - 1000px) / 2);
z-index: 12;
/* Third Nav */
/* justify-content: flex-start; */
`;

export const NavLink = styled(Link)`
color: #808080;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;
&.active {
	color: #000000;
}
&:hover {
  color: #000000;
}
`;

export const NavMenu = styled.div`
display: flex;
align-items: center;
margin-right: -24px;
/* Second Nav */
/* margin-right: 24px; */
/* Third Nav */
/* width: 100vw;
white-space: nowrap; */
@media screen and (max-width: 768px) {
	display: none;
}
`;

export const NavBtn = styled.nav`
display: flex;
align-items: center;
margin-right: 24px;
/* Third Nav */
/* justify-content: flex-end;
width: 100vw; */
@media screen and (max-width: 768px) {
	display: none;
}
`;

export const NavBtnLink = styled(Link)`
border-radius: 4px;
background: #808080;
padding: 10px 22px;
color: #000000;
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;
/* Second Nav */
margin-left: 24px;
&:hover {
	transition: all 0.2s ease-in-out;
	background: #fff;
	color: #808080;
}
`;



export const NavBar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to='profile' >
            Profile
          </NavLink>
          <NavLink to='users' >
            Users
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to=''>Sign out</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};