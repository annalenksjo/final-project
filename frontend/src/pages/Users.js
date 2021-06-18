import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useHistory, Link} from 'react-router-dom'
import styled from 'styled-components'

import { API_URL } from '../urls/urls'
import { AboutSection } from '../components/MainContainers'
import { InnerMainLoggedIn, Main, OnClickDiv } from 'components/MainContainers'
import { NavBar } from 'components/NavBar'
import { NavLink } from 'components/NavBar'
import { Input } from 'components/Input'
import { StyledButton } from 'components/Button'
import { SearchForm } from 'components/Form'
import { Loader } from 'components/Loader'
import { Header } from 'components/Header'
import { Subtext } from 'components/Subtext'
import { Dialog } from '../components/Dialog'
import user from '../reducers/user'


export const Users = () => {
  const [userList, setUserList] = useState([])
  const [userSearch, setUserSearch] = useState('')

  const Loading = useSelector(store => store.user.loading)
  const dispatch = useDispatch()
  const history = useHistory()

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

    setUserSearch('')
  }

  const onGoToUserProfile = (action) => {
    history.push(`/users/${action.username}`)
    dispatch(user.actions.setLoading(true))
    dispatch(user.actions.setBrowsedUser(action))
    dispatch(user.actions.setLoading(false))
  }
 
  return (
    <>
    <NavBar/>
    <Main>
      <InnerMainLoggedIn>
      {Loading? <Loader/> :
      <>
      <Header>Topplista</Header>
      <AboutSection>
        <img src="https://via.placeholder.com/300" alt="Fågelspaning prispall"/>
        <Subtext>
          Här kan du se vem som leder fågelspaningsligan! Ju fler fågelarter du sett desto högre upp hamnar du på topplistan. 
        </Subtext>
      </AboutSection>
        <SearchForm onSubmit={onSearch}>
            <Input 
            type="text"
            onChange={(event) => setUserSearch(event.target.value)}
            value={userSearch} placeholder="Sök på användare"/>
          <StyledButton type="submit"><span aria-label="magnifying glass emoji" role="img">🔍</span></StyledButton>
          {userList.length === 0 ? <p>Hittade inga användare!</p> : '' }
        </SearchForm>
      </>
      }
      <UserMapContainer>
      {userList.map(user => (
          <OnClickDiv          
              //to={() => `/users/${user.username}`} 
              onClick = {() => onGoToUserProfile(user)}
              key={user._id}
              >
          <Dialog
            title={`${user.username}`}
            subheading={`Spaningar: ${user.birdsSeen.length}/40`}
            image={"https://img-premium.flaticon.com/png/128/3560/premium/3560332.png?token=exp=1623852494~hmac=b4fcd3ef37d33834a2118864b9065ee5"}
          />
          </OnClickDiv> 
      ))}
      </UserMapContainer>
      </InnerMainLoggedIn>
    </Main>
    </>
  )
}

const UserMapContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

// const UserMapButtonContainer = styled.div`
  
// `;