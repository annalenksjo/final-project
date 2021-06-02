import React from 'react'

import { StyledButton } from '../components/Button'
import { Footer } from 'components/Footer'
import { Form } from 'components/Form'
import { Input } from 'components/Input'

export const StartPage = () => {
  return (
    <>
      <h1>Welcome</h1>
      <p>Log In or create a new account</p>
      <Form>
        <Input type="text"/>
        <Input type="password"/>
      </Form>
      <StyledButton>Log in</StyledButton>
      <StyledButton>Sign up</StyledButton>      
      <Footer>A Technigo bootcamp project by Anna, Elle and Tobias</Footer>
    </>
  )
}