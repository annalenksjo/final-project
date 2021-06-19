import React from 'react'
import styled from 'styled-components/macro'


export const Hamburger = styled.img`
  width: 30px;
  @media (min-width: 768px) {
    display: none;
  }

`


export const HamburgerMenu = () => {
  return (
    <Hamburger src="https://res.cloudinary.com/mittbildmoln/image/upload/v1624115425/hamburgermenu_c9pfxi.png"></Hamburger>
  )
}