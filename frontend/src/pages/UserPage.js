import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'


import { NavBar } from '../components/NavBar'
import { StyledButton } from '../components/Button'
import { API_URL } from '../urls/urls'
import { ChallengeOptions } from 'components/ChallengeOptions'

export const UserPage = () => {
  const [showChallenges, setShowChallenges] = useState(false)
  const history = useHistory()

  const browsedUser = useSelector(store => store.user.browsedUser)
  
  useEffect(() => {
    const fetchUserProfile = () => {
        fetch(API_URL(`users/${browsedUser._id}`))
        .then(response => response.json())
        .then (data => console.log(data)) 
    }
    fetchUserProfile()
  },[browsedUser])

  if(browsedUser) {
    return (
      <>
      <NavBar/>
      <h2>Username: {browsedUser.username}</h2>
      <p>Member since: {browsedUser.memberSince}</p>
      <StyledButton onClick={ () => history.push('/users') }>Back</StyledButton>
      <StyledButton onClick={ () => setShowChallenges(true) }>
        {!showChallenges? 'Show Challenges' : 'Hide'}
      </StyledButton>
      {showChallenges? <ChallengeOptions/> : ''}
    </>
    )   
  }
 else {
    return (
      <></>
    )
  }
}