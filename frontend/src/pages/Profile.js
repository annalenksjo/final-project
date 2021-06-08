import React from 'react'
import { Link } from 'react-router-dom'

import { ProfileImage } from '../components/ProfileImage'
import { StyledButton } from 'components/Button'
import { NavBar } from 'components/NavBar'

export const Profile = () => {
  return (
    <>
      <NavBar />
      <p>Profile</p>
      <ProfileImage />
    </>
  )
}

//profilpicture
//username
//statestic card
//presentationtext
