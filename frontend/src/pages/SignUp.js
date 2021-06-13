import React, { useState } from 'react'

import { StyledButton } from '../components/Button'
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