import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'

import { API_URL } from '../urls/urls'
import user from '../reducers/user'
import { Form } from './Form'
import { Input } from './Input'
import { StyledButton } from './Button'
import { SubText } from './Text'

const Button = styled(StyledButton)`
  @media (min-width: 1024px) {
    margin: 8px 0;
  }
`
const InputMargin = styled(Input)`
  @media (min-width: 1024px) {
    margin: 8px 0;
  }
`

export const LoginForm = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const loggedInUser = useSelector(store => store.user.loggedInUser)
  const error = useSelector(store => store.user.errors)

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (loggedInUser && loggedInUser.accessToken) {
      history.push('/minsida')
    }
  },[loggedInUser, history])

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
            dispatch(user.actions.setloggedInUser(data))
            dispatch(user.actions.setErrors(null))
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
    <Form onSubmit={onLogin}> 
        <InputMargin onChange={(event) => setUsername(event.target.value)}
        value={username} type='text' required placeholder='Användarnamn'/>
        <InputMargin onChange={(event) => setPassword(event.target.value)}
        value={password} type='password' required placeholder='Lösenord'/>
      {error ? <SubText>{error.message}</SubText> : ''}
        <Button type='submit'>Logga in</Button>
        <Button onClick={() => history.push('/')}>Tillbaka</Button>
    </Form>
  )
}

