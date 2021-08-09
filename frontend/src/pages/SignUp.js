import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/macro'

import { RegisterForm } from 'components/RegisterForm'
import { Logotype } from 'components/Logotype'
import { Header } from 'components/Text'
import { Loader } from 'components/Loader'
import { InnerMain, Main } from 'components/MainContainers'
import user from '../reducers/user'

const SignUpInnerMain = styled(InnerMain)`
@media (min-width: 768px) {
  justify-content: center; 
  align-items: center;
  height: 60vh;
}
@media (min-width: 1024px) {
  height: 70vh;
}
`

const SignUpWelcomeSection = styled.div`
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

const SignUpFormContainer = styled.div`
  margin: 10px 0 0 0;
  padding: 0 4px;
  width: 100%;  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 768px) {
    max-width: 400px;
  }
  @media (min-width: 1024px) {
    padding-top: 20px;
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

export const SignUp = () => {
  const Loading = useSelector(store => store.user.loading)
  const dispatch = useDispatch()
  dispatch(user.actions.setErrors(null))
  
  return (
    <>
      {Loading?
        <Loader/>
        :
        <Main>
          <Logotype />
          <SignUpInnerMain>
            <SignUpWelcomeSection>
              <StartImage src='https://res.cloudinary.com/mittbildmoln/image/upload/v1624367181/kompisar_s3vtb1.png'></StartImage>
            <SignUpFormContainer>
              <Header> Välkommen hit! </Header>
              <RegisterForm/>
            </SignUpFormContainer>
            </SignUpWelcomeSection>
          </SignUpInnerMain>
        </Main>   
      }
    </>   
  )
}