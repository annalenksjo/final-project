import React, { useState, useEffect } from 'react'

import { NavBar } from '../components/NavBar'
import { API_URL } from '../urls/urls'

export const UserPage = ({ useraccount }) => {
  
  useEffect(() => {
    const fetchUserProfile = () => {
        fetch(API_URL(`users?useraccount=${useraccount}`))
        .then(response => response.json())
        .then (data => console.log(data))
        console.log({useraccount})   
    }
    fetchUserProfile()
  },[])

  return (
    <>
      <NavBar/>
      <h2>Profile:</h2>
      <p>Hello</p>
    </>
  )
}