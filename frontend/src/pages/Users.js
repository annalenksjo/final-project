import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { API_URL } from '../urls/urls'
import { NavBar } from 'components/NavBar'
import { Input } from 'components/Input'
import { StyledButton } from 'components/Button'
import { Form } from 'components/Form'
import user from '../reducers/user'

export const Users = () => {

  const [userList, setUserList] = useState([1])
  const [userSearch, setUserSearch] = useState('')

  const dispatch = useDispatch()

  // useEffect(() => {
  //   const fetchUserList = () => {
  //       fetch(API_URL('users'))
  //       .then(response => response.json())
  //       .then (data => setUserList(data)) 
  //   }
  //   fetchUserList()
  // },[])

  const onSearch = (event) => {
    event.preventDefault()

    fetch(API_URL(`users?useraccount=${userSearch}`))
    .then(response => response.json())
    .then (data => setUserList(data))
  }

  const onGoToUserProfile = (action) => {
    dispatch(user.actions.setBrowsedUser(action))
    console.log(action)
  }
 
  return (
    <>
    <NavBar/>
    <Form onSubmit={onSearch}>
      <label> Search users
        <Input 
        type="text"
        onChange={(event) => setUserSearch(event.target.value)}
        value={userSearch} />
      </label>
      <StyledButton type="submit"><span aria-label="magnifying glass emoji" role="img">🔍</span></StyledButton>
      {userList.length === 0 ? <p>No users found!</p> : '' }
      {userList.length > 1 ? <p>Found {userList.length} users</p> : '' }
    </Form>
      {userList.map(user => (
        <Link 
          key={user._id} 
          to={() => `/users/${user.username}`} 
          onClick = {() => onGoToUserProfile(user)}
        >
          <p>{user.username}</p>
        </Link>    
      ))}
    </>
  )
}