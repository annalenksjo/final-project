import React, { useState } from 'react'

import { API_URL } from '../urls/urls'

export const Users = () => {
  const [userList, setUserList] = useState([])

  const fetchUserList = () => {
    fetch('http://localhost:8080/users')
      .then(response => response.json())
      .then (data => console.log(data))
    }
 

  return (
    <h1>A list of all the users</h1>
  )
}