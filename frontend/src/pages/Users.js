import React, { useState } from 'react'

import { API_URL } from '../urls/urls'
import { NavBar } from 'components/NavBar'

export const Users = () => {
  const [userList, setUserList] = useState([])

  const fetchUserList = () => {
    fetch('http://localhost:8080/users')
      .then(response => response.json())
      .then (data => console.log(data))
  }
 

  return (
    <>
    <NavBar/>
    <h1>A list of all the users</h1>
      <div></div>
    </>
  )
}