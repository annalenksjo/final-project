import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NavBar } from '../components/NavBar'
import { StyledButton } from '../components/Button'
import { API_URL } from '../urls/urls'
import { ChallengeOptions } from 'components/ChallengeOptions'

export const UserPage = () => {
  const [showChallenges, setShowChallenges] = useState(false)

  const browsedUser = useSelector(store => store.user.browsedUser)
  
  useEffect(() => {
    const fetchUserProfile = () => {
        fetch(API_URL(`users?useraccount=${browsedUser}`))
        .then(response => response.json())
        .then (data => console.log(data)) 
    }
    fetchUserProfile()
  },[])

  return (
    <>
      <NavBar/>
      <h2>Profile: {browsedUser}</h2>
      <p>Information</p>
      <StyledButton onClick={ () => setShowChallenges(true) }>
        {!showChallenges? 'Show Challenges' : 'Hide'}
      </StyledButton>
      {showChallenges? <ChallengeOptions/> : ''}
    </>
  )
}