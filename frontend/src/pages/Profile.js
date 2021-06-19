import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory} from 'react-router-dom'
import styled from 'styled-components/macro'

import { NavBar } from 'components/NavBar'
import { StyledButton } from 'components/Button'
import { Dialog } from 'components/Dialog'
import { API_URL } from 'urls/urls'
import { Loader } from 'components/Loader'
import { Main, InnerMainLoggedIn, OnClickDiv } from 'components/MainContainers'
import { Container, ListContainer } from './GardenBirds'
import { ProfileImage } from 'components/ProfileImage'
import { HTwo, HThree } from 'components/Text'

import user from 'reducers/user'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`
const ProfileInfoDiv = styled(StyledDiv)`
flex-direction: column;
background-color: red;
align-items: center;
height: 200px;

`


export const Profile = () => {
  const LoggedInUser = useSelector(store => store.user.loggedInUser)
  const LoggedInUserID = useSelector(store => store.user.loggedInUser.userID)
  const Loading = useSelector(store => store.user.loading)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [userData, setUserData] = useState({})

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUserProfile = () => {
        fetch(API_URL(`users/${LoggedInUserID}`))
        .then(response => response.json())
        .then (data => setUserData(data)) 
    }
    fetchUserProfile()
  },[LoggedInUserID])

  const onDeleteAccount = () => {
    dispatch(user.actions.setLoading(true))  
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(API_URL(`users/${LoggedInUserID}`), options)
      .then (response => response.json())
      .then (data => console.log(data))
      .finally(() => dispatch(user.actions.setLoading(false)))
    localStorage.clear()
    history.push('/')
    }

    // const onDeleteBird = (bird) => {
    //   fetch(API_URL(`users/${LoggedInUserID}/addbird/`), {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       birdId : bird
    //     })
    //   })
    //   .then (response => response.json())
    //   .then (data => console.log(data))
    // }  

       const BirdArray = LoggedInUser.birdsSeen

    const onGetBirdPage = (action) => {
      dispatch(user.actions.setLoading(true))
      dispatch(user.actions.setBrowsedBird(action))
      dispatch(user.actions.setLoading(false))
      history.push(`/fagelbiblioteket/${action.name}`)
    }

    // const onEditAccount = () => {
    //   console
    //   // dispatch(labyrinth.actions.setLoading(true))  
    //   // const options = {
    //   //   method: 'Patch',
    //   //   headers: {
    //   //     'Content-Type': 'application/json'
    //   //   }
    //   // }
  
    //   // fetch(API_URL(`users/${UserID}`), options)
    //   //   .then (response => response.json())
    //   //   .then (data => console.log(data))
    //   // .finally(() => dispatch(labyrinth.actions.setLoading(false)))
    //    }

  return (
    <>
    <NavBar />
      <Main>
        <InnerMainLoggedIn>
          {Loading? <Loader/> :
          <> 
           <ProfileInfoDiv>     
              <ProfileImage/>
              <HTwo>{userData.username}</HTwo>
              <HThree>Mina fågelspaningar {BirdArray.length} av 40 möjliga</HThree>
            </ProfileInfoDiv>  
            <StyledDiv>
            {showConfirmation? <div>
              <p>Är du säker?</p>
              <StyledButton onClick={() => onDeleteAccount()}>Ja, ta bort konto</StyledButton>
              <StyledButton onClick={() => setShowConfirmation(false)}>Avbryt</StyledButton>
            </div> 
            : <StyledButton onClick={() => setShowConfirmation(true)}>Ta bort konto</StyledButton>}
            </StyledDiv>
            
            <Container>                           
              <ListContainer>
                {userData.birdsSeen && userData.birdsSeen.map(bird =>
                  <OnClickDiv
                    key={bird._id}
                    onClick={() => onGetBirdPage(bird)}
                    //to={`/fagelbiblioteket${bird.name}`}
                  >
                    <Dialog
                      title={bird.name}
                      image={bird.image}
                      // button1={`👀 x 2`}
                      // button1Click={() => console.log('hej')} 
                      // button2={'Ta bort från lista'}
                      // button2Click={() => onDeleteBird(bird)}
                    />
                  </OnClickDiv>          
                )}  
              </ListContainer>
            </Container>
            <StyledButton onClick={() => history.push('/fagelbiblioteket')}>Till Fågelbiblioteket</StyledButton>
          </>
          }
          </InnerMainLoggedIn>
      </Main>
    </>
  )
}
