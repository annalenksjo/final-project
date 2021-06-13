import React, { useState } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { API_URL } from '../urls/urls'
import user from '../reducers/user'
import { Form } from './Form'
import { Input } from './Input'
import { StyledButton } from './Button'
import { Loader } from './Loader'

export const LoginForm = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const accessToken = useSelector(store => store.user.accessToken)
  const Loading = useSelector(store => store.user.loading)

  const history = useHistory()
  const dispatch = useDispatch()

  const onLogin = (event) => {
    dispatch(user.actions.setLoading(true))  
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
            if (accessToken) {
              history.push('/profile')
            }
          })
         
        } else {
          dispatch(user.actions.setErrors(data))
          dispatch(user.actions.setUserMessage('Login unsuccessful'))
          setUsername('')
          setPassword('')
        }
      })
      .catch()
      .finally(() => dispatch(user.actions.setLoading(false)))
  }

  return(
    <>
    {Loading? <Loader/> : 
      <Form onSubmit={onLogin}>
        <label>
        Användarnamn: 
          <Input onChange={(event) => setUsername(event.target.value)}
          value={username} type="text" required/>
        </label>
        <label>
        Lösenord:
          <Input onChange={(event) => setPassword(event.target.value)}
          value={password} type="password"/>
        </label>
        <StyledButton type='submit'>Log in</StyledButton>
      </Form>
    }
    <StyledButton onClick={() => history.push('/')}>Tillbaka</StyledButton>
  </>
  )
}

