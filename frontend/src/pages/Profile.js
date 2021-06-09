import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { ProfileImage } from '../components/ProfileImage'
import { NavBar } from 'components/NavBar'
import { StyledButton } from 'components/Button'
import { API_URL } from 'urls/urls'

export const Profile = () => {
  const LoggedInUser = useSelector(store => store.user.username)
  const UserID = useSelector(store => store.user.userID)

  const history = useHistory()

  const onDeleteAccount = () => {
    //add are you sure? Alert or something
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(API_URL(`users/${UserID}`), options)
      .then (response => response.json())
      .then (data => console.log(data)
        // (response.success) {
        //   console.log('account deleted')
        //   localStorage.clear()
        //   history.push('/')
        // } else {
        //   console.log('Something went wrong')
      )
    localStorage.clear()
    history.push('/')

    }

  return (
    <>
      <NavBar />
      <h2>My Profile</h2>
      <p>Username: {LoggedInUser}</p>
      <p>Member since: </p>
      <StyledButton>Edit profile</StyledButton>
      <StyledButton onClick={() => onDeleteAccount()}>Delete Account</StyledButton>
      <ProfileImage />
    </>
  )
}

//profilpicture
//username
//statestic card
//presentationtext
