import React from 'react'
import styled from 'styled-components/macro'

import { P } from 'components/Text'

const FooterDiv = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #FAE5A2;
  @media (min-width: 768px) {
    margin-top: 20px;
    padding: 20px;
    font-size: 18px;
  }
  @media (min-width: 1024px) {
    font-size: 20px;
  }
` 

const Tag = styled.a`
  text-decoration: underline;
  font-family: 'Quicksand', sans-serif;
  color: #0C4458;
`

export const Footer = () => {
  return (
    <FooterDiv>
      <P>Ett projekt av Anna Lenksjö, Elle Frankenberg och Tobias Hagberg. Illustrationer av August Florén.</P>
      <br></br>
      <Tag href='https://github.com/annalenksjo/final-project'>GitHub</Tag>        
    </FooterDiv>
  )
}