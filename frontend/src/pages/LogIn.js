import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { InnerMain, Main } from 'components/MainContainers'
import { Logotype } from 'components/Logotype'
import { LoginForm } from 'components/LoginForm'
import { Header } from 'components/Text'
import { Loader } from 'components/Loader'

const LogInInnerMain = styled(InnerMain)`
@media (min-width: 768px) {
  justify-content: center; 
  align-items: center;
  height: 60vh;
}
@media (min-width: 1024px) {
  height: 70vh;
}
`

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
  height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 768px) {
    max-width: 500px;
  }
  @media (min-width: 1024px) {
    padding-top: 20px;
  }
  @media (min-width: 2560px) {
    height: 450px;
  }
  
  `

const StartImage = styled.img`
  max-width: 50%;
  @media (min-width: 768px) {
    display: flex;
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

export const LogIn = () => {
  const Loading = useSelector(store => store.user.loading)
  
  return (
    <>
      {Loading?
        <Loader/>
        :
        <Main>
          <Logotype />
          <LogInInnerMain>      
            <LoginWelcomeSection>        
                <StartImage src='https://res.cloudinary.com/mittbildmoln/image/upload/v1624367181/kompisar_s3vtb1.png'></StartImage>
              <LoginFormContainer>
                <Header> Välkommen tillbaka! </Header> 
                <LoginForm/>
              </LoginFormContainer>
            </LoginWelcomeSection> 
          </LogInInnerMain>
        </Main>
      }
    </>
  )
}