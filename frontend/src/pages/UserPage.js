import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'


import { NavBar } from '../components/NavBar'
import { StyledButton } from '../components/Button'
import { API_URL } from '../urls/urls'
import { ChallengeOptions } from 'components/ChallengeOptions'
import user from 'reducers/user'
import { Loader } from 'components/Loader'

export const UserPage = () => {
  const [showChallenges, setShowChallenges] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  const browsedUser = useSelector(store => store.user.browsedUser)
  const Loading = useSelector(store => store.user.loading)
  
  useEffect(() => {
    dispatch(user.actions.setLoading(true))
    const fetchUserProfile = () => {
        fetch(API_URL(`users/${browsedUser._id}`))
        .then(response => response.json())
        .then (data => console.log(data))
        .finally(() => dispatch(user.actions.setLoading(false)))
    }
    fetchUserProfile()
  },[])

  if(browsedUser) {
    return (
      <>
        {Loading? <Loader/> :
          <>
            <NavBar/>
            <h2>Username: {browsedUser.username}</h2>
            <p>Member since: {browsedUser.memberSince}</p>
            {(browsedUser.motto === '')? <p>Motto: This user have not added a motto yet... </p>
              : <p>Motto: {browsedUser.motto}</p>
            }
            <StyledButton onClick={ () => history.push('/users') }>Back</StyledButton>
            <StyledButton onClick={ () => setShowChallenges(true) }>
              {!showChallenges? 'Show Challenges' : 'Hide'}
            </StyledButton>
            {showChallenges? <ChallengeOptions/> : ''}
          </>
        }        
      </>
    )   
  }
 else {
    return (
      <></>
    )
  }
}