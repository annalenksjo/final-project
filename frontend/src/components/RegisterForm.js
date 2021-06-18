import React, { useState } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { API_URL } from '../urls/urls'
import user from '../reducers/user'

import { StyledButton } from './Button'
import { HeighForm } from './Form'
import { Input } from './Input'
import { Loader } from './Loader'


export const RegisterForm = () => {
  const [ registerUsername, setRegisterUsername ] = useState('')
  const [ registerPassword, setRegisterPassword ] = useState('')
  const [ passwordMatch, setPasswordMatch ] = useState('')
  const [ registerError, setRegisterError ] = useState(null)

  const error = useSelector(store => store.user.errors)
  const Loading = useSelector(store => store.user.loading)

  const history = useHistory()
  const dispatch = useDispatch()

  const onRegister = (event) => {
    dispatch(user.actions.setLoading(true))
    event.preventDefault()

    if (registerPassword !== passwordMatch) {
      setRegisterError('Lösenorden måste vara samma')
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
              dispatch(user.actions.setloggedInUser(data))
              dispatch(user.actions.setErrors(null))
              dispatch(user.actions.setUserMessage('Register successful'))
              console.log('register successful')
              console.log(data)
              history.push('/minsida')            
            })
          } else {
            dispatch(user.actions.setErrors(data))
          }
        })
        .catch()
        .finally(() => dispatch(user.actions.setLoading(false)))
    }    
  }
  
  return (
    <>
      {Loading? <Loader/> : 
        <HeighForm onSubmit={onRegister}>
            <Input onChange={(event) => setRegisterUsername(event.target.value)}
            value={registerUsername} type="text" placeholder="Användarnamn"/>
            <Input onChange={(event) => setRegisterPassword(event.target.value)}
            value={registerPassword} type="password" placeholder="Lösenord"/>
            <Input onChange={(event) => setPasswordMatch(event.target.value)}
            value={passwordMatch} type="password" placeholder="Upprepa lösenord"/>
          {registerError ? <p>{registerError}</p> : '' }
          {error ? <p>{error.message}</p> : ''}
          <StyledButton type="submit"> Registrera!</StyledButton>
          <StyledButton onClick={() => history.push('/')}>Tillbaka</StyledButton>
        </HeighForm>
      }
      
    </>
  )
}