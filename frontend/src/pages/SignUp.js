import React from 'react'

import { RegisterForm } from 'components/RegisterForm'
import { Main } from '../pages/Main'
import { InnerMain } from '../pages/Main'

export const SignUp = () => {
  return (
    <Main>
      <InnerMain>
        <RegisterForm/>
      </InnerMain>
    </Main>    
  )
}