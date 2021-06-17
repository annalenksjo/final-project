import React from 'react'

import { Main } from '../pages/Main'
import { InnerMain } from '../pages/Main'

import { LoginForm } from 'components/LoginForm'
import { Header } from 'components/Header'

export const LogIn = () => {
  return (
    <Main>
      <InnerMain>
      <Header>
          Välkommen tillbaka!
        </Header>
        <LoginForm/>
      </InnerMain>
    </Main>   
  )
}