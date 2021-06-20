import React from 'react'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'


export const Hamburger = styled.img`
  width: 30px;
  :hover {
    cursor: pointer;
  }
  @media (min-width: 768px) {
    display: none;
  }
`


export const HamburgerMenu = () => {

  const history = useHistory()


  return (
    <Hamburger onClick={() => history.push('/meny')} src="https://res.cloudinary.com/mittbildmoln/image/upload/v1624115425/hamburgermenu_c9pfxi.png"></Hamburger>
  )
}