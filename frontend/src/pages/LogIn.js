import React from 'react'
import styled from 'styled-components/macro'

import { InnerMain, Main, AboutSection } from 'components/MainContainers'

import { LoginForm } from 'components/LoginForm'
import { Header } from 'components/Text'

const LoginWelcomeSection = styled(AboutSection)`
 margin: 50px 0 0 0;
 height: 450px;
 justify-content: space-between;
 width: 100%;
`

const LoginFormContainer = styled.div`
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

export const LogIn = () => {
  return (
    <Main>
        <Logotype src="https://res.cloudinary.com/mittbildmoln/image/upload/v1623943290/Blames_med_titel_adxxiz.png"></Logotype>
      <InnerMain>
        <LoginWelcomeSection> 
          <StartImage src="https://res.cloudinary.com/mittbildmoln/image/upload/v1623942849/Blames_illustration_jqnlfn.png"></StartImage>
          <Header>
            Välkommen tillbaka!
          </Header>
          <LoginFormContainer>
            <LoginForm/>
          </LoginFormContainer>
        </LoginWelcomeSection> 
      </InnerMain>
    </Main>   
  )
}