import React, { useState } from 'react'

import { Form } from './Form'
import { Input } from './Input'
import { StyledButton } from './Button'

export const LoginForm = ({ onLogin }) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  return(
    <Form onSubmit={onLogin}>
      <label>
        Username: 
        <Input onChange={(event) => setUsername(event.target.value)}
        value={username} type="text"/>
      </label>
      <label>
        Password:
      <Input onChange={(event) => setPassword(event.target.value)}
        value={password} type="password"/>
      </label>
      <StyledButton type='submit'>Log in</StyledButton>
    </Form>
  )
}

