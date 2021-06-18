import React from 'react'

import { RegisterForm } from 'components/RegisterForm'
import { Header } from 'components/Header'
import { InnerMain, Main } from 'components/MainContainers'

export const SignUp = () => {
  return (
    <Main>
      <InnerMain>
        <Header>
          Välkommen hit!
        </Header>
        <RegisterForm/>
      </InnerMain>
    </Main>    
  )
}