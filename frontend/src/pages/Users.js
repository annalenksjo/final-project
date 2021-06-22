import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import { API_URL } from '../urls/urls'
import { AboutSection } from '../components/MainContainers'
import { InnerMainLoggedIn, Main, OnClickDiv } from 'components/MainContainers'
import { NavBar } from 'components/NavBar'
import { Input } from 'components/Input'
import { StyledButton } from 'components/Button'
import { UserSearchForm } from 'components/Form'
import { Loader } from 'components/Loader'
import { Header, HThree, } from 'components/Text'
import { Dialog } from '../components/Dialog'
import { Footer } from '../components/Footer'
import user from '../reducers/user'

const UserMapContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  
  @media(min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`

const Wrapper = styled(OnClickDiv)`
  @media(min-width: 768px) {
    max-width: 30%;
    min-width: min-content;
  }
  @media(min-width: 1024px) {
    width: 25%;
  }
`

const UsersInnerMain = styled(InnerMainLoggedIn)`
  padding-top: 130px;
  @media(min-width: 768px){
    padding-top: 200px;
  }
`

const HighScoreImage = styled.img`
  width: 100%;
  margin: 15px 0 15px 0;
  @media(min-width: 768px){
    width: 40%;
    margin: 15px 20px;
  }
  @media(min-width: 1024px) {
    width: 30%;
    margin: 0;
  }
`

const SubTitle = styled(HThree)`
  @media(min-width: 1024px) {
    max-width: 40%;
    margin-left: 30px;
  }
`

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
      {Loading? 
        <Loader/> 
        :
        <Main>
          <UsersInnerMain>     
          <>
          <Header>Topplistan</Header>
          <AboutSection>
            <HighScoreImage src="https://res.cloudinary.com/mittbildmoln/image/upload/v1623940639/topplista_pldnzu.png" alt="Fågelspaning prispall"/>
            <SubTitle>
            <br></br> Här kan du se vem som leder fågelspaningsligan! <br></br> Ju fler fågelarter du sett desto högre upp hamnar du på topplistan. 
            </SubTitle>
          </AboutSection>
            <UserSearchForm onSubmit={onSearch}>
              <Input 
                type="text"
                onChange={(event) => setUserSearch(event.target.value)}
                value={userSearch} placeholder="Användare"
              />
              <StyledButton type="submit">Sök</StyledButton>
            </UserSearchForm>
            {userList.length === 0 ? <HThree>Hittade inga användare!</HThree> : '' }
          </>
          <UserMapContainer>
          {userList.map(user => (
              <Wrapper
                  onClick = {() => onGoToUserProfile(user)}
                  key={user._id}
                  >
              <Dialog
                title={`${user.username}`}
                subheading={`Spaningar: ${user.birdsSeen.length}/40`}
                image2={"https://res.cloudinary.com/mittbildmoln/image/upload/v1623940616/fagelholk_xtv0tw.png"}
              />
              </Wrapper> 
          ))}
          </UserMapContainer>
          <Footer/>
          </UsersInnerMain>
        </Main>
      }
    </>
  )
}
