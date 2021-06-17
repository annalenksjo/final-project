import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Polaroid from "react-polaroid";

import { API_URL } from '../urls/urls'
import { Main } from '../pages/Main'
import { InnerMain } from '../pages/Main'
import { NavBar } from 'components/NavBar'
import { NavLink } from 'components/NavBar'
import { Input } from 'components/Input'
import { StyledButton } from 'components/Button'
import { Form } from 'components/Form'
import { Loader } from 'components/Loader'
import { Container, ListContainer } from './GardenBirds';
import user from '../reducers/user'

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`

export const Users = () => {
  const [userList, setUserList] = useState([])
  const [userSearch, setUserSearch] = useState('')

  const Loading = useSelector(store => store.user.loading)
  const dispatch = useDispatch()
  const history = useHistory()

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
    // history.push(`/users/${action.username}`)
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
    <Container>
      {userList.map(user => (
          <ListContainer>
          <Polaroid key={user._id}
            imgSrc={"https://img-premium.flaticon.com/png/128/3560/premium/3560332.png?token=exp=1623852494~hmac=b4fcd3ef37d33834a2118864b9065ee5"}  
            height={250}            
            width={250}
            frontText={`${user.username}, antal sedda fåglar: ${user.birdsSeen.length}`}
            style={
              {
                fontSize: 16,
              }
            }
          >
            </Polaroid>
            {/* <TextBox>
              <h4>Antal sedda fåglar: {user.birdsSeen.length}</h4>
            </TextBox> */}
            <StyledButton>
              <Link              
                to={() => `/users/${user.username}`} 
                onClick = {() => onGoToUserProfile(user)}
              >
                Gå till profil
              </Link>
            </StyledButton>
          </ListContainer>
      ))}
      </Container>
      </InnerMain>
    </Main>
    </>
  )
}