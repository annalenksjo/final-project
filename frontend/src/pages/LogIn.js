import React from 'react'

import { Main } from '../pages/Main'
import { InnerMain } from '../pages/Main'

import { LoginForm } from 'components/LoginForm'

export const LogIn = () => {
  return (
    <Main>
      <InnerMain>
        <LoginForm/>
      </InnerMain>
    </Main>   
  )
}