import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

import { API_URL } from '../urls/urls'
import user from 'reducers/user'
import { Loader } from '../components/Loader'
import { StyledButton } from '../components/Button'
import { NavBar } from '../components/NavBar'
import { Subtext } from '../components/Subtext'
import { Main, InnerMain } from 'components/MainContainers'

export const UserPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const browsedUser = useSelector(store => store.user.browsedUser)
  const Loading = useSelector(store => store.user.loading)

  const Date = browsedUser.memberSince
  const BirdArray = browsedUser.birdsSeen
  
  useEffect(() => {
    dispatch(user.actions.setLoading(true))
    const fetchUserProfile = () => {
        fetch(API_URL(`users/${browsedUser._id}`))
        .then(response => response.json())
        .then (data => console.log(data))
        .finally(() => dispatch(user.actions.setLoading(false)))
    }
    fetchUserProfile()
  },[LoggedInUserID])

  if(browsedUser) {
    return (
      <Main>
        <InnerMain>
        {Loading? <Loader/> :
          <>
            <NavBar/>
            <h2>Användarnamn: {browsedUser.username}</h2>
            <Subtext>Medlem sedan: {moment(Date).format('ll')} </Subtext>
            
            {BirdArray.length === 0 ? <Subtext>
              {browsedUser.username} verkar inte ha några spaningar i sin lista ännu.
            </Subtext>

            :
            <Subtext>Sedda fåglar: {browsedUser.birdsSeen.length}</Subtext>
            }
            {/* {(browsedUser.motto === '')? <p>Bio: Här var det tomt... </p>
              : <p>Motto: {browsedUser.motto}</p>
            } */}
            <StyledButton onClick={() => history.push('/topplistan')}>Tillbaka</StyledButton>
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