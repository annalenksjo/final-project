import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { API_URL } from '../urls/urls'
import { Main } from '../pages/Main'
import { InnerMain } from '../pages/Main'
import { NavBar } from 'components/NavBar'
import { NavLink } from 'components/NavBar'
import { Input } from 'components/Input'
import { StyledButton } from 'components/Button'
import { Form } from 'components/Form'
import { Loader } from 'components/Loader'
import { Card } from 'components/Card'
import user from '../reducers/user'

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`

export const Users = () => {
  const [userList, setUserList] = useState([1])
  const [userSearch, setUserSearch] = useState('')
  const Loading = useSelector(store => store.user.loading)
  const dispatch = useDispatch()

  //order this list based on birds seen. 
  // need infinite scrolling or pagination or something

  useEffect(() => {
    const fetchUserList = () => {
        fetch(API_URL('users'))
        .then(response => response.json())
        .then (data => setUserList(data)) 
    }
    fetchUserList()
  },[])

  const onSearch = (event) => {
    dispatch(user.actions.setLoading(true))
    event.preventDefault()

    fetch(API_URL(`users?useraccount=${userSearch}`))
    .then(response => response.json())
    .then (data => setUserList(data))
    .finally(() => dispatch(user.actions.setLoading(false)))
  }

  const onGoToUserProfile = (action) => {
    dispatch(user.actions.setLoading(true))
    dispatch(user.actions.setBrowsedUser(action))
    dispatch(user.actions.setLoading(false))
  }
 
  return (
    <>
    <NavBar/>
    <Main>
      <InnerMain>
      {Loading? <Loader/> :
      <>
      <h1>Topplista 🦉</h1>
        <Form onSubmit={onSearch}>
          <label> Sök användare:
            <Input 
            type="text"
            onChange={(event) => setUserSearch(event.target.value)}
            value={userSearch} />
          </label>
          <StyledButton type="submit"><span aria-label="magnifying glass emoji" role="img">🔍</span></StyledButton>
          {userList.length === 0 ? <p>Hittade inga användare!</p> : '' }
        </Form>
      </>
    }
      {userList.map(user => (
        <Card key={user._id}>
          <TextBox>
            <h2>{user.username}</h2>
            <h4>Antal sedda fåglar: {user.birdsSeen}</h4>
          </TextBox>
          <StyledButton>
            <Link              
              to={() => `/users/${user.username}`} 
              onClick = {() => onGoToUserProfile(user)}
            >
              Gå till profil
            </Link>
          </StyledButton>
        </Card>
      ))}
      </InnerMain>
    </Main>
    </>
  )
}