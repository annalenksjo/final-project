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

  const loggedInUser = useSelector(store => store.user.loggedInUser)
  const Loading = useSelector(store => store.user.loading)
  const error = useSelector(store => store.user.errors)

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
            dispatch(user.actions.setloggedInUser(data))
            dispatch(user.actions.setErrors(null))
          })        
        } else {
          dispatch(user.actions.setErrors(data))
          dispatch(user.actions.setUserMessage('Login unsuccessful'))
          setUsername('')
          setPassword('')
        }
        if (loggedInUser && loggedInUser.accessToken) {
          console.log('successful')
          history.push('/minsida')
        } 
      })
      .catch()
      .finally(() => dispatch(user.actions.setLoading(false)))
  }

  return(
  <>
    {Loading? <Loader/> :
      <>
        <Form onSubmit={onLogin}> 
            <Input onChange={(event) => setUsername(event.target.value)}
            value={username} type="text" required placeholder="Användarnamn"/>
            <Input onChange={(event) => setPassword(event.target.value)}
            value={password} type="password" placeholder="Lösenord"/>
          {error ? <p>{error.message}</p> : ''}
          <StyledButton type='submit'>Logga in</StyledButton>
          <StyledButton onClick={() => history.push('/')}>Tillbaka</StyledButton>
        </Form>     
      </>
    }
  </>
  )
}

