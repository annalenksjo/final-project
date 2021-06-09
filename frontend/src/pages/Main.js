import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { StyledButton } from '../components/Button'
import { Footer } from '../components/Footer'
import { LoginForm } from 'components/LoginForm'
import { RegisterForm } from 'components/RegisterForm'

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
    <>
      <h1>Welcome</h1>
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
  
      <Footer>A Technigo bootcamp project by Anna, Elle and Tobias</Footer>
    </>
  )
}

