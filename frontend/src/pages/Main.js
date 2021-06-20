import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import { NavLink } from '../components/NavBar'
import { Header, HThree } from '../components/Text'
import { Main, InnerMain, AboutSection } from '../components/MainContainers'
import '../index.css'

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StartImage = styled.img`
  width: 100%;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    max-width: 40%;
    padding: 20px;
  }
`
const FirstpageNavlink = styled(NavLink)`
  color: #FF7460;
  margin: 0;
  &:hover {
    opacity: 0.8;
  }
`
const TextContainer = styled.div`
 display: flex;
 flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: column;
    padding: 20px 80px;
  }
`
const Logotype = styled.img`
  width: 200px;
  margin: 20px 0 0 20px;
`
const FirstpageSubtext = styled(HThree)`
  font-size: 18px;
  margin: 10px 0 5px 0;
`

export const StartPage = () => {
  const history = useHistory()

  return (
    <Main>
       <Logotype src="https://res.cloudinary.com/mittbildmoln/image/upload/v1623943290/Blames_med_titel_adxxiz.png"></Logotype>
      <InnerMain>  
        <AboutSection>        
          <StartImage src="https://res.cloudinary.com/mittbildmoln/image/upload/v1623942849/Blames_illustration_jqnlfn.png"></StartImage>
          <TextContainer> 
            <Header>Fram med kikaren, nu kör vi!</Header>
            <FirstpageSubtext>Denna app listar de vanligaste trädgårdsfåglarna som förekommer i Sverige. Här kan du markera vilka fåglar du sett i din trädgård eller omgivning.</FirstpageSubtext>
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

