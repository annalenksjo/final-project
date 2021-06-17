import React from 'react'

import { RegisterForm } from 'components/RegisterForm'
import { Header } from 'components/Header'
import { Main } from '../pages/Main'
import { InnerMain } from '../pages/Main'

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