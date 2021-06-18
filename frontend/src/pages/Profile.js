import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory} from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'

import { NavBar, NavLink } from 'components/NavBar'
import { StyledButton } from 'components/Button'
import { Dialog } from 'components/Dialog'
import { API_URL } from 'urls/urls'
import { Loader } from 'components/Loader'
import { InnerMain, Main } from 'components/MainContainers'
import { Container, ListContainer } from './GardenBirds'

import user from 'reducers/user'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
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

    const Date = LoggedInUser.memberSince
    const BirdArray = LoggedInUser.birdsSeen    
    // const onGetBirdPage = (action) => {
    //   dispatch(user.actions.setLoading(true))
    //   dispatch(user.actions.setBrowsedBird(action))
    //   dispatch(user.actions.setLoading(false))
    //   console.log(action)
    //   history.push(`/fagelbiblioteket/${action.name}`)
    // }

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
        <InnerMain>
          {Loading? <Loader/> :
          <> 
            <StyledDiv>
            <div>     
              <h2>Min profil: {userData.username}</h2>
              <p>Medlem sedan: {moment(Date).format('ll')}</p>
            </div>  
            {showConfirmation? <div>
              <p>Är du säker?</p>
              <StyledButton onClick={() => onDeleteAccount()}>Ja, ta bort konto</StyledButton>
              <StyledButton onClick={() => setShowConfirmation(false)}>Avbryt</StyledButton>
            </div> 
            : <StyledButton onClick={() => setShowConfirmation(true)}>Ta bort konto</StyledButton>}
            </StyledDiv>
            <h3>Mina fågelspaningar</h3>
            <h5>Antal: {BirdArray.length}</h5>
            <Container>                           
              <ListContainer>
                {userData.birdsSeen && userData.birdsSeen.map(bird =>
                  <NavLink
                    key={bird._id}
                    to={`tradgardsfaglar/${bird.name}`}
                  >
                    <Dialog
                      title={bird.name}
                      image={bird.image}
                      // button1={`👀 x 2`}
                      // button1Click={() => console.log('hej')} 
                      // button2={'Ta bort från lista'}
                      // button2Click={() => onDeleteBird(bird)}
                    />
                  </NavLink>          
                )}  
              </ListContainer>
            </Container>
            <StyledButton onClick={() => history.push('/fagelbiblioteket')}>Till Fågelbiblioteket</StyledButton>
          </>
          }
          </InnerMain>
      </Main>
    </>
  )
}
