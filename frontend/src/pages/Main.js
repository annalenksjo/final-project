import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import { Logotype } from '../components/Logotype'
import { StyledNavLink, LinkContainer } from '../components/NavBar'
import { Header, SubText } from '../components/Text'
import { Main, InnerMain, AboutSection } from '../components/MainContainers'

const FirstPageInnerMain = styled(InnerMain)`
@media (min-width: 768px) {
  justify-content: center; 
  align-items: center;
  height: 60vh;
}
@media (min-width: 1024px) {
  height: 70vh;
}
`

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (min-width: 768px) {
   padding: 0 10px 0 0;
  }
  @media (min-width: 1024px) {
   padding: 0 15px 0 0;
  }
  @media (min-width: 1440px) {
   padding: 0 20px 0 0;
  }
`

const LinkContainerStart = styled(LinkContainer)`
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }
`

const HeaderLink = styled(StyledNavLink)`
  font-size: 20px;
  font-weight: bold;
  @media (min-width: 1024px) {
    font-size: 24px
  }
  &:hover {
    text-decoration: underline;
  }
`

const StartImage = styled.img`
  width: 100%;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    max-width: 45%;
    margin-left: 40px;
  }
  @media (min-width: 1024px) {
    max-width: 40%;
    margin-left: 40px;
  }
  @media (min-width: 1440px) {
    max-width: 35%;
    margin-left: 40px;
  }
`

const FirstpageNavlink = styled(StyledNavLink)`
  color: #FF7460;
  margin: 0;
  &:hover {
    opacity: 0.8;
  }
  @media (min-width: 768px) {
    display: none;
  }
`

const TextContainer = styled.div`
 display: flex;
 flex-direction: column;
  @media (min-width: 768px) {
    align-items: center;
    padding: 0 20px;
  }
  @media (min-width: 1024px) {
    padding: 0 50px;
  }
`

const FirstpageSubtext = styled(SubText)`
  margin: 10px 0 5px 0;
  @media (min-width: 768px) {
    align-self: center;
  }
`

export const StartPage = () => {
  const history = useHistory()

  return (
    <Main>
      <NavContainer>
       <Logotype />
       <LinkContainerStart>
          <HeaderLink onClick={() => history.push('/loggain')} to='/loggain'> Redan fågelspanare? </HeaderLink>
          <HeaderLink onClick={() => history.push('skapakonto')} to='/skapakonto'> Bli en fågelspanare! </HeaderLink>
       </LinkContainerStart>
      </NavContainer>
      <FirstPageInnerMain>  
        <AboutSection>        
          <StartImage src='https://res.cloudinary.com/mittbildmoln/image/upload/v1623942849/Blames_illustration_jqnlfn.png'></StartImage>
          <TextContainer> 
            <Header>Fram med kikaren, <br></br> nu kör vi!</Header>
            <FirstpageSubtext>Denna app listar de vanligaste fåglarna i Sverige. <br></br> Här kan du markera vilka fåglar du sett i din trädgård eller omgivning.</FirstpageSubtext>
          </TextContainer> 
        </AboutSection>
        <LinksContainer>
            <FirstpageNavlink onClick={() => history.push('/loggain')} to='/loggain'>Redan fågelspanare?</FirstpageNavlink>
            <FirstpageNavlink onClick={() => history.push('skapakonto')} to='/skapakonto'>Bli en fågelspanare!</FirstpageNavlink>
        </LinksContainer>
      </FirstPageInnerMain>
    </Main>  
  )
}

