import React from 'react'
import styled from 'styled-components/macro'

import { InnerMain, Main, AboutSection } from 'components/MainContainers'

import { LoginForm } from 'components/LoginForm'
import { Header } from 'components/Text'

const LoginWelcomeSection = styled.div`
  margin: 50px 0 0 0;
  height: 100vh;
  display: flex;
  justify-items: center; 
  flex-direction: column;
  align-items: center;  
  width: 100%;
  @media (min-width: 768px) {
    margin-top: 200px;
    flex-direction: row;
  }
`
const LoginFormContainer = styled.div`
  margin: 10px 0 0 0;
  padding: 0 4px;
  width: 100%;  
  @media (min-width: 768px) {
    max-width: 500px;
  }
`
const Logotype = styled.img`
  width: 200px;
  margin: 20px 0 0 20px;
`
const StartImage = styled.img`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    max-width: 40%;
  }
`

export const LogIn = () => {
  return (
    <Main>
        <Logotype src="https://res.cloudinary.com/mittbildmoln/image/upload/v1623943290/Blames_med_titel_adxxiz.png"></Logotype>
      <InnerMain>
        <LoginWelcomeSection>        
            <StartImage src="https://res.cloudinary.com/mittbildmoln/image/upload/v1623942849/Blames_illustration_jqnlfn.png"></StartImage>
          <LoginFormContainer>
            <Header>
              Välkommen tillbaka!
            </Header> 
            <LoginForm/>
          </LoginFormContainer>
        </LoginWelcomeSection> 
      </InnerMain>
    </Main>   
  )
}