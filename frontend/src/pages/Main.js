import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import { StyledNavLink, Nav, LinkContainer } from '../components/NavBar'
import { Header, HThree } from '../components/Text'
import { Main, InnerMain, AboutSection } from '../components/MainContainers'
import '../index.css'

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const LinkContainerStart = styled(LinkContainer)`
  @media (max-width: 767px) {
    display: none;
  }
`
const HeaderLink = styled(StyledNavLink)`
  font-size: 20px;
  font-weight: bold;
  @media (min-width: 1024px) {
    font-size: 24px
  }
`

const StartImage = styled.img`
  width: 100%;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    max-width: 40%;
    padding: 20px;
    margin-left: 60px;
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
    flex-direction: column;
    padding: 0px 20px;
  }
`
const Logotype = styled.img`
  width: 200px;
  margin: 20px 0 20px 20px;
`
const FirstpageSubtext = styled(HThree)`
  margin: 10px 0 5px 0;
  @media (min-width: 768px) {
    padding: 20px;
    margin-left: 60px;
    max-width: 60%;
    align-self: center;
  }
`

export const StartPage = () => {
  const history = useHistory()

  return (
    <Main>
      <NavContainer>
       <Logotype src="https://res.cloudinary.com/mittbildmoln/image/upload/v1623943290/Blames_med_titel_adxxiz.png"></Logotype>
       <LinkContainerStart>
          <HeaderLink onClick={() => history.push('/loggain')} to='/loggain'>
            Redan fågelspanare?
          </HeaderLink>
          <HeaderLink onClick={() => history.push('skapakonto')} to='/skapakonto'>
            Bli en fågelspanare!
          </HeaderLink>
       </LinkContainerStart>
      </NavContainer>
      <InnerMain>  
        <AboutSection>        
          <StartImage src="https://res.cloudinary.com/mittbildmoln/image/upload/v1623942849/Blames_illustration_jqnlfn.png"></StartImage>
          <TextContainer> 
            <Header>Fram med kikaren, <br></br> nu kör vi!</Header>
            <FirstpageSubtext>Denna app listar de vanligaste fåglarna i Sverige. Här kan du markera vilka fåglar du sett i din trädgård eller omgivning.</FirstpageSubtext>
          </TextContainer> 
        </AboutSection>
        <LinksContainer>
            <FirstpageNavlink onClick={() => history.push('/loggain')} to='/loggain'>Redan fågelspanare?</FirstpageNavlink>
            <FirstpageNavlink onClick={() => history.push('skapakonto')} to='/skapakonto'>Bli en fågelspanare!</FirstpageNavlink>
        </LinksContainer>
      </InnerMain>
    </Main>  
  )
}

