import React, { useState } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { API_URL } from '../urls/urls'
import user from '../reducers/user'

import { StyledButton } from './Button'
import { Form } from './Form'
import { Input } from './Input'

export const RegisterForm = () => {
  const [ registerUsername, setRegisterUsername ] = useState('')
  const [ registerPassword, setRegisterPassword ] = useState('')
  const [ passwordMatch, setPasswordMatch ] = useState('')
  const [ registerError, setRegisterError ] = useState(null)

  const accessToken = useSelector(store => store.user.accessToken)
  const errorMessage = useSelector(store => store.user.errors)
  const userMessage = useSelector(store => store.user.message)
  const history = useHistory()
  const dispatch = useDispatch()

  const onRegister = (event) => {
    event.preventDefault()

    if (registerPassword !== passwordMatch) {
      setRegisterError('Passwords must match')
    } else {
      setRegisterError(null)

      fetch(API_URL('register'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username : registerUsername,
          password : registerPassword
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            batch(() => {
              dispatch(user.actions.setUsername(data.username))
              dispatch(user.actions.setAccessToken(data.accessToken))
              dispatch(user.actions.setErrors(null))
              dispatch(user.actions.setUserMessage('Register successful'))
              console.log('register successful')
              console.log(data)
              if (accessToken) {
                history.push('/profile')
              }
            })
          } else {
            dispatch(user.actions.setErrors(data))
            console.log('line 94')
          }
        })
        .catch()
    }    
  }
  
  return (
    <Form onSubmit={onRegister}>
      <label>
      Choose username: 
        <Input onChange={(event) => setRegisterUsername(event.target.value)}
        value={registerUsername} type="text"/>
      </label>
      <label>
      Password:
        <Input onChange={(event) => setRegisterPassword(event.target.value)}
        value={registerPassword} type="password"/>
      </label>
      <label>
      Repeat password:
        <Input onChange={(event) => setPasswordMatch(event.target.value)}
        value={passwordMatch} type="password"/>
      </label>
      {registerError ? <p>{registerError}</p> : '' }
      <StyledButton type="submit"> Sign up!</StyledButton>
    </Form>
  )
}