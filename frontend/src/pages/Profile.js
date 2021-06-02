import React from 'react'

import { ProfileImage } from '../components/ProfileImage'
import { ProfileImageCropper } from '../components/ProfileImageCropper'

export const Profile = () => {
  return (
    <>
      <p>Profile</p>
      <ProfileImageCropper>
        <ProfileImage/>
      </ProfileImageCropper>
    </>
  )
}

//profilpicture
//username
//presentationtext
