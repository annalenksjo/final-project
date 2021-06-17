import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'

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
  const loggedInUserId = useSelector(store => store.user.userID)
  const Loading = useSelector(store => store.user.loading)

  const Date = browsedUser.memberSince
  
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
      <Main>
        <InnerMain>
        {Loading? <Loader/> :
          <>
            <NavBar/>
            <h2>Användarnamn: {browsedUser.username}</h2>
            <p>Medlem sedan: {moment(Date).format('ll')}</p>
            <p>Sedda fåglar: {browsedUser.birdsSeen.length}</p>
            {/* {(browsedUser.motto === '')? <p>Bio: Här var det tomt... </p>
              : <p>Motto: {browsedUser.motto}</p>
            } */}
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