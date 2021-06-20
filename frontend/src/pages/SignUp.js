import React from 'react'
import styled from 'styled-components/macro'

import { RegisterForm } from 'components/RegisterForm'
import { Header } from 'components/Text'
import { InnerMain, Main, AboutSection } from 'components/MainContainers'

const SignUpWelcomeSection = styled.div`
  margin: 50px 0 0 0;
  height: 100vh;
  /* justify-content: space-around; */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 768px) {
    margin-top: 200px;
    flex-direction: row;
  } 
`
const SignUpFormContainer = styled.div`
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

export const SignUp = () => {
  return (
    <Main>
      <Logotype src="https://res.cloudinary.com/mittbildmoln/image/upload/v1623943290/Blames_med_titel_adxxiz.png"></Logotype>
      <InnerMain>
        <SignUpWelcomeSection>
          <StartImage src="https://res.cloudinary.com/mittbildmoln/image/upload/v1623942849/Blames_illustration_jqnlfn.png"></StartImage>
        <SignUpFormContainer>
          <Header>
            Välkommen hit!
          </Header>
          <RegisterForm/>
        </SignUpFormContainer>
        </SignUpWelcomeSection>
      </InnerMain>
    </Main>    
  )
}