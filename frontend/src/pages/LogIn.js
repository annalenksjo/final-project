import React from 'react'
import styled from 'styled-components'

import { InnerMain, Main, AboutSection } from 'components/MainContainers'

import { LoginForm } from 'components/LoginForm'
import { Header } from 'components/Header'

const Logotype = styled.img`
  width: 200px;
  margin: 20px 0 0 20px;
`
const StartImage = styled.img`
  width: 90%;
  margin-bottom: 10px;
`

export const LogIn = () => {
  return (
    <Main>
        <Logotype src="https://res.cloudinary.com/mittbildmoln/image/upload/v1623943290/Blames_med_titel_adxxiz.png"></Logotype>
      <InnerMain>
        <AboutSection> 
          <StartImage src="https://res.cloudinary.com/mittbildmoln/image/upload/v1623942849/Blames_illustration_jqnlfn.png"></StartImage>
          <Header>
            Välkommen tillbaka!
          </Header>
          <LoginForm/>
        </AboutSection> 
      </InnerMain>
    </Main>   
  )
}