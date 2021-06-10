import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { StyledButton } from '../components/Button'

import { LoginForm } from 'components/LoginForm'
import { RegisterForm } from 'components/RegisterForm'

import '../index.css'

export const StartPage = () => {
  const [ showRegister, setShowRegister ] = useState(false)
  const errorMessage = useSelector(store => store.user.errors)

    // const onPasswordMatch = (event) => {
  //   setPassword(event.target.value)
  //   if (password === passwordMatch) {
  //     setEnableRegisterButton(false)
  //   }
  // }

  // exchange the forms to styled components RegisterForm and LoginForm

  return (
    <main className='main-main-container'>
      <h1>Welcome</h1>
      <section className='main-section-container'>
        {errorMessage ? <p>{errorMessage.message}</p> : ''}
          {!showRegister ? 
          <>      
          <LoginForm />    
          <p>Not a member?</p>
          <StyledButton onClick={() => setShowRegister(true)}>Register</StyledButton>
          </>
          :
          <>
            <RegisterForm />
          <StyledButton onClick={() => setShowRegister(false)}>Back</StyledButton>
          </>
          }
      </section> 
    </main>  
  )
}

