import React from 'react'

import { StyledButton } from '../components/Button'
import { Footer } from '../components/Footer'
import { Form } from '../components/Form'
import { Input } from '../components/Input'

export const StartPage = () => {
  return (
    <>
      <h1>Welcome</h1>
      <p>Log In or create a new account</p>
        <Form>
          {/* <label>
            Username: 
            <Input onChange={(event) => setUsername(event.target.value)}
            value={username} type="text"/>
          </label>
          <label>
            Password:
            <Input  onChange={(event) => setPassword(event.target.value)}
            value={password} type="password"/>
          </label>
        <StyledButton onClick={onLogin}>Log in</StyledButton> */}
      </Form>
      <StyledButton>Sign up</StyledButton>      
      <Footer>A Technigo bootcamp project by Anna, Elle and Tobias</Footer>
    </>
  )
}

