import React from 'react'
import styled from 'styled-components/macro'

import { RegisterForm } from 'components/RegisterForm'
import { Header } from 'components/Text'
import { InnerMain, Main, AboutSection } from 'components/MainContainers'

const SignUpWelcomeSection = styled(AboutSection)`
margin: 50px 0 0 0;
height: 510px;
justify-content: space-between;
width: 100%;
`
const SignUpFormContainer = styled.div`
  margin: 10px 0 0 0;
  width: 100%;
`
const Logotype = styled.img`
  width: 200px;
  margin: 20px 0 0 20px;
`
const StartImage = styled.img`
  display: none;
`

export const SignUp = () => {
  return (
    <Main>
      <Logotype src="https://res.cloudinary.com/mittbildmoln/image/upload/v1623943290/Blames_med_titel_adxxiz.png"></Logotype>
      <InnerMain>
        <SignUpWelcomeSection>
          <StartImage src="https://res.cloudinary.com/mittbildmoln/image/upload/v1623942849/Blames_illustration_jqnlfn.png"></StartImage>
          <Header>
            Välkommen hit!
          </Header>
        <SignUpFormContainer>
          <RegisterForm/>
        </SignUpFormContainer>
        </SignUpWelcomeSection>
      </InnerMain>
    </Main>    
  )
}