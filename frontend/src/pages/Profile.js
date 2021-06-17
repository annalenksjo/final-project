import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory} from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'

import { NavBar } from 'components/NavBar'
import { StyledButton } from 'components/Button'
import { API_URL } from 'urls/urls'
import { Loader } from 'components/Loader'
import { Main } from '../pages/Main'
import { InnerMain } from '../pages/Main'
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
  },[])

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

    const Date = userData.memberSince

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
            <h5>Antal: Gör en map här:</h5>
            <Container>                           
              <ListContainer>
                <h4>Fågelart</h4>
                <StyledButton>
                  Läs mer 
                </StyledButton>   
              </ListContainer>
            </Container>
            <StyledButton onClick={() => history.push('/tradgardsfaglar')}>Lägg till fler fåglar</StyledButton>
          </>
          }
          </InnerMain>
      </Main>
    </>
  )
}
