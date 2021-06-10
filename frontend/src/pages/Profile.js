import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { ProfileImage } from '../components/ProfileImage'
import { NavBar } from 'components/NavBar'
import { StyledButton } from 'components/Button'
import { API_URL } from 'urls/urls'
import { Loader } from 'components/Loader'
import user from 'reducers/user'


export const Profile = () => {
  const LoggedInUser = useSelector(store => store.user.username)
  const Loading = useSelector(store => store.user.loading)
  const UserID = useSelector(store => store.user.userID)

  const [showConfirmation, setShowConfirmation] = useState(false)

  const history = useHistory()
  const dispatch = useDispatch()

  const onDeleteAccount = () => {
    dispatch(user.actions.setLoading(true))  
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(API_URL(`users/${UserID}`), options)
      .then (response => response.json())
      .then (data => console.log(data))
      .finally(() => dispatch(user.actions.setLoading(false)))
    localStorage.clear()
    history.push('/')
    }

    const onEditAccount = () => {
      // dispatch(labyrinth.actions.setLoading(true))  
      // const options = {
      //   method: 'Patch',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // }
  
      // fetch(API_URL(`users/${UserID}`), options)
      //   .then (response => response.json())
      //   .then (data => console.log(data))
      // .finally(() => dispatch(labyrinth.actions.setLoading(false)))
       }

  return (
    <>
      {Loading? <Loader/> :
      <>
        <NavBar />
        <h2>My Profile</h2>
        <p>Username: {LoggedInUser}</p>
        <p>Member since: </p>
        <StyledButton onClick={() => onEditAccount()}>Edit profile</StyledButton>
        {showConfirmation? <div>
          <p>Are you sure?</p>
          <StyledButton onClick={() => onDeleteAccount()}>Yes</StyledButton>
          <StyledButton onClick={() => setShowConfirmation(false)}>No</StyledButton>
        </div> 
        : <StyledButton onClick={() => setShowConfirmation(true)}>Delete Account</StyledButton>}        
        <ProfileImage />
        </>
      }
    </>
  )
}

//profilpicture
//username
//statestic card
//presentationtext
