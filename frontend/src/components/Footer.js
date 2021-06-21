import React from 'react'
import styled from 'styled-components/macro'

import { NavLink, Nav } from 'components/NavBar'
import { HTwo, HThree, P } from 'components/Text'

const FooterDiv = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  /* height: 80px; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  padding: 20px;
  margin-top: 50px;
  background-color: #FAE5A2;

  @media (min-width: 768px) {
  
  }
` 

const Tag = styled.a`
  text-decoration: underline;
  color: #0C4458;
`

export const Footer = () => {
  return (
    <FooterDiv>
      <P>Ett projekt av <br></br> Anna Lenksjö, Elle Frankenberg och Tobias Hagberg.</P>
      <P>Illustrationer av August Florén.</P>
      <br></br>
      <Tag href="https://github.com/annalenksjo/final-project">GitHub</Tag>        
    </FooterDiv>
  )
}