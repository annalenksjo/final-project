import React, { useState } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { API_URL } from '../urls/urls'
import user from '../reducers/user'
import { Form } from './Form'
import { Input } from './Input'
import { StyledButton } from './Button'

export const LoginForm = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const accessToken = useSelector(store => store.user.accessToken)
  const errorMessage = useSelector(store => store.user.errors)
  const userMessage = useSelector(store => store.user.message)
  const history = useHistory()
  const dispatch = useDispatch()

  const onLogin = (event) => {
    event.preventDefault()
    
    fetch(API_URL('login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setUserID(data.userID))
            dispatch(user.actions.setErrors(null))
            dispatch(user.actions.setUserMessage('Login successful'))
            console.log('login successful')
            if (accessToken) {
             setTimeout(() => {
                history.push('/profile')
              }, 3000)
            }
          })
         
        } else {
          dispatch(user.actions.setErrors(data))
          dispatch(user.actions.setUserMessage('Login unsuccessful'))
          setUsername('')
          setPassword('')
          console.log('login unsuccessful')
        }
      })
      .catch()
  }

  return(
    <>
    <Form onSubmit={onLogin}>
      <label>
      Username: 
        <Input onChange={(event) => setUsername(event.target.value)}
        value={username} type="text" required/>
      </label>
      <label>
      Password:
        <Input onChange={(event) => setPassword(event.target.value)}
        value={password} type="password"/>
      </label>
      <StyledButton type='submit'>Log in</StyledButton>
    </Form> 
    {userMessage? <p>{userMessage}</p> : '' }
    {errorMessage? <p>{errorMessage}</p> : '' }
  </>
  )
}

