import React from 'react'
import styled from 'styled-components/macro'

import { InnerMain, Main } from 'components/MainContainers'
import { Logotype } from 'components/Logotype'
import { LoginForm } from 'components/LoginForm'
import { Header } from 'components/Text'

const LoginWelcomeSection = styled.div`
  margin: 50px 0 0 0;
  display: flex;
  justify-content: center; 
  flex-direction: column;
  align-items: center;  
  width: 100%;
  @media (min-width: 768px) {
    flex-direction: row;
    margin: 0;
    padding: 0 20px;
  }
`
const LoginFormContainer = styled.div`
  margin: 10px 0 0 0;
  padding: 0 4px;
  width: 100%;  
  @media (min-width: 768px) {
    max-width: 500px;
  }
  @media (min-width: 1024px) {
    padding-top: 20px;
  }
`

const StartImage = styled.img`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    max-width: 60%;
    padding: 30px 10px 0 10px;
    height: fit-content;
  }
  @media (min-width: 1024px) {
    max-width: 40%;
  }
`

export const LogIn = () => {
  
  return (
    <Main>
        <Logotype />
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