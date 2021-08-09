import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory} from 'react-router-dom'
import styled from 'styled-components/macro'

import { NavBar } from 'components/NavBar'
import { StyledButton } from 'components/Button'
import { Dialog } from 'components/Dialog'
import { API_URL } from 'urls/urls'
import { Loader } from 'components/Loader'
import { Main, InnerMainLoggedIn, OnClickDiv, StyledDivRow, ProfileInfoDiv  } from 'components/MainContainers'
import { Container, ListContainer } from './GardenBirds'
import { ProfileImage } from 'components/ProfileImage'
import { Header, SubText } from 'components/Text'
import { Form } from 'components/Form'
import { Footer } from 'components/Footer'

import user from 'reducers/user'

const SearchBirdsForm = styled(Form)`
  height: 60px;
  padding: 0 20px 0 20px;
  @media (min-width: 768px) {
    flex-direction: row;
    margin: 20px 0;
  }
  @media (min-width: 1024px) {
    margin: 30px 0;
  }
`

const Wrapper = styled(OnClickDiv)`
  @media(min-width: 768px) {
    max-width: 30%;
    min-width: min-content;
  }
  @media(min-width: 1024px) {
    min-width: min-content;
    max-width: 25%;
  }
`
const Button = styled(StyledButton)`
  margin: 10px 4px;
`

export const Profile = () => {
  const LoggedInUserID = useSelector(store => store.user.loggedInUser.userID)
  const accessToken = useSelector(store => store.user.loggedInUser.accessToken)
  const Loading = useSelector(store => store.user.loading)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [userData, setUserData] = useState({})

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUserProfile = () => {
      if (!accessToken) {
        history.push('/')
      } else {
        const options = {
          method: 'GET',
          headers: {
            Authorization: accessToken
          }
        }
        fetch(API_URL(`users/${LoggedInUserID}`), options)
        .then(response => response.json())
        .then (data => setUserData(data)) 
      }
    }
    fetchUserProfile()
  }, [LoggedInUserID, accessToken, history])

  const onDeleteAccount = () => {
    dispatch(user.actions.setLoading(true))  
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }
    fetch(API_URL(`users/${LoggedInUserID}`), options)
      .then (response => response.json())
      .then (data => console.log(data.success))
      .finally(() => dispatch(user.actions.setLoading(false)))
    localStorage.clear()
    history.push('/')
    }

    const onGetBirdPage = (action) => {
      dispatch(user.actions.setLoading(true))
      dispatch(user.actions.setBrowsedBird(action))
      dispatch(user.actions.setLoading(false))
      history.push(`/fagelbiblioteket/${action.name}`)
    }

   return (
    <>
      <NavBar />
      {Loading? 
        <Loader/> 
        :
        <Main>
          <InnerMainLoggedIn>
              <ProfileInfoDiv>    
                <ProfileImage/>
                <Header>{userData.username}</Header>                           
              </ProfileInfoDiv>  
              <SearchBirdsForm>
              <>
                {!userData.birdsSeen? 
                  <SubText>Du har inga fågelspaningar ännu!</SubText>
                  : 
                  <SubText>Mina fågelspaningar:<br></br> {userData.birdsSeen && userData.birdsSeen.length} av 40</SubText>
                }
                </>
              </SearchBirdsForm>              
              <Container>                         
                <ListContainer>
                  {userData.birdsSeen && userData.birdsSeen.map(bird =>
                    <Wrapper
                      key={bird._id}
                      onClick={() => onGetBirdPage(bird)}
                    >
                      <Dialog
                        title={bird.name}
                        image={bird.image}
                      />
                    </Wrapper>          
                  )}  
                </ListContainer>
              </Container>          
              <StyledDivRow>
                {showConfirmation? 
                  <div>
                    <SubText>Är du säker?</SubText>
                    <div>
                      <Button onClick={() => onDeleteAccount()}> Ja, ta bort konto </Button>
                      <Button onClick={() => setShowConfirmation(false)}> Avbryt </Button>
                    </div> 
                  </div>
                  : 
                  <Button onClick={() => setShowConfirmation(true)}> Ta bort konto </Button>
                }
              </StyledDivRow>
            <Footer/>
          </InnerMainLoggedIn>
        </Main>
      }
    </>
  )
}
