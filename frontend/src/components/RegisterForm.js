import React, { useState } from 'react'

import { StyledButton } from './Button'
import { Form } from './Form'
import { Input } from './Input'

export const RegisterForm = ( { onRegister } ) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  
  return (
    <Form onSubmit={onRegister}>
      <label>
        Choose username: 
        <Input onChange={(event) => setUsername(event.target.value)}
        value={username} type="text"/>
      </label>
      <label>
        Password:
        <Input type="password"/>
      </label>
      <label>
        Repeat password:
        <Input  onChange={(event) => setPassword(event.target.value)}
        value={password} type="password"/>
      </label>
      <StyledButton type='submit'>Sign up!</StyledButton>
    </Form>
  )
}