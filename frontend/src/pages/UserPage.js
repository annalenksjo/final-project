import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { API_URL } from '../urls/urls'
import user from 'reducers/user'
import { Loader } from '../components/Loader'
import { StyledButton } from '../components/Button'
import { NavBar } from '../components/NavBar'
import { Main } from '../pages/Main'
import { InnerMain } from '../pages/Main'

export const UserPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const browsedUserId = useSelector(store => store.user.browsedUser._id)
  const browsedUser = useSelector(store => store.user.browsedUser)
  const browsedUserName = useSelector(store => store.user.browsedUser.username)
  const loggedInUserName = useSelector(store => store.user.username)
  const loggedInUserId = useSelector(store => store.user.userID)
  const Loading = useSelector(store => store.user.loading)
  const Message = useSelector(store => store.user.message)
  
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

  const onSendChallenge = (event) => {
    dispatch(user.actions.setLoading(true)) 
     
    fetch(API_URL('games'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        player1 : loggedInUserId,
        player2 : browsedUserId
      })
    })
      .then(response => response.json())
      .then(data => {
    
            // dispatch(user.actions.setUsername(data.username))
            // dispatch(user.actions.setAccessToken(data.accessToken))
            // dispatch(user.actions.setUserID(data.userID))
            dispatch(user.actions.setErrors(null))
            dispatch(user.actions.setUserMessage('Game started!'))
            console.log(data)
          })
      .catch()
      .finally(() => dispatch(user.actions.setLoading(false)))
  }
  


  if(browsedUser) {
    return (
      <Main>
        <InnerMain>
        {Loading? <Loader/> :
          <>
            <NavBar/>
            <h2>Användarnamn: {browsedUser.username}</h2>
            <p>Medlem sedan: {browsedUser.memberSince}</p>
            <p>Sedda fåglar: {browsedUser.birdsSeen}</p>
            {(browsedUser.motto === '')? <p>Bio: Här var det tomt... </p>
              : <p>Motto: {browsedUser.motto}</p>
            }
            <StyledButton onClick={() => history.push('/toplist')}>Tillbaka</StyledButton>
          </>
        }
        </InnerMain>      
      </Main>
    )   
  }
 else {
    return (
      <></>
    )
  }
}