import React, { useState, useEffect } from 'react'

import { API_URL } from '../urls/urls'
import { NavBar } from 'components/NavBar'
import { Input } from 'components/Input'
import { StyledButton } from 'components/Button'
import { Form } from 'components/Form'

export const Users = () => {
  const [userList, setUserList] = useState([])
  const [userSearch, setUserSearch] = useState('')
  // const [search, performSearch] = useState(false)

  useEffect(() => {
    const fetchUserList = () => {
        // fetch(API_URL(`users?useraccount=${userSearch}`))
        // .then(response => response.json())
        // .then (data => setUserList(data))
        // console.log('searching')
      
        fetch(API_URL('users'))
        .then(response => response.json())
        .then (data => setUserList(data))
        console.log('not searching')
       
    }
    fetchUserList()
  },[])

  const onSearch = (event) => {
    event.preventDefault()

    fetch(API_URL(`users?useraccount=${userSearch}`))
    .then(response => response.json())
    .then (data => setUserList(data))
    console.log('searching')

  }
 

  return (
    <>
    <NavBar/>
    <h1>A list of all the users</h1>
    <Form onSubmit={onSearch}>
      <label> Search user
        <Input 
        type="text"
        onChange={(event) => setUserSearch(event.target.value)}
        value={userSearch} />
      </label>
      <StyledButton type="submit"><span aria-label="magnifying glass emoji" role="img">🔍</span></StyledButton>
    </Form>
      {userList.map(user => (
        <div key={user.username}>
          <p>{user.username}</p>
        </div>
      ))}
    </>
  )
}