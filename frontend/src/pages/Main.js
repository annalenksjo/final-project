import React, { useState } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { API_URL } from '../urls/urls'
import user from '../reducers/user'

import { StyledButton } from '../components/Button'
import { Footer } from '../components/Footer'
//import { RegisterForm } from 'components/RegisterForm'
//import { LoginForm } from 'components/LoginForm'
import { Form } from 'components/Form'
import { Input } from 'components/Input'

export const StartPage = () => {
  const [ username, setUsername ] = useState('')
  const [ registerUsername, setRegisterUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ registerPassword, setRegisterPassword ] = useState('')
  const [ passwordMatch, setPasswordMatch ] = useState('')
 // const [ enableRegisterButton, setEnableRegisterButton ] = useState(true)
  const [ registerError, setRegisterError ] = useState(null)
  const [ showRegister, setShowRegister ] = useState(false)

  const accessToken = useSelector(store => store.user.accessToken)
  const errorMessage = useSelector(store => store.user.errors)
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
            dispatch(user.actions.setErrors(null))
            console.log('login successful')
          })
         
        } else {
          dispatch(user.actions.setErrors(data))
          setUsername('')
          setPassword('')
          console.log('login unsuccessful')
        }
      })
      .catch()
    history.push('/profile')
  }

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
          username,
          password
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            console.log('user created')
          } else {
            dispatch(user.actions.setErrors(data))
          }
        })
        .catch()
    }    
  }

  // const onPasswordMatch = (event) => {
  //   setPassword(event.target.value)
  //   if (password === passwordMatch) {
  //     setEnableRegisterButton(false)
  //   }
  // }

  // exchange the forms to styled components RegisterForm and LoginForm

  return (
    <>
      <h1>Welcome</h1>
      {errorMessage ? <p>{errorMessage.message}</p> : ''}
      {!showRegister ? 
      <>      
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
         <p>Not a member?</p>
        <StyledButton onClick={() => setShowRegister(true)}>Register</StyledButton>
        </>
        :
        <>
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
          <StyledButton onClick={() => setShowRegister(false)}>Back</StyledButton>
        </>
        }
  
      <Footer>A Technigo bootcamp project by Anna, Elle and Tobias</Footer>
    </>
  )
}

