import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { ProfileImage } from '../components/ProfileImage'
import { NavBar } from 'components/NavBar'
import { StyledButton } from 'components/Button'
import { API_URL } from 'urls/urls'
import { Loader } from 'components/Loader'
import { Main } from '../pages/Main'
import { InnerMain } from '../pages/Main'
import user from 'reducers/user'


export const Profile = () => {
  const LoggedInUser = useSelector(store => store.user.username)
  const Loading = useSelector(store => store.user.loading)
  const UserID = useSelector(store => store.user.userID)

  const [showConfirmation, setShowConfirmation] = useState(false)

  const history = useHistory()
  const dispatch = useDispatch()

  const onDeleteAccount = () => {
    dispatch(user.actions.setLoading(true))  
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(API_URL(`users/${UserID}`), options)
      .then (response => response.json())
      .then (data => console.log(data))
      .finally(() => dispatch(user.actions.setLoading(false)))
    localStorage.clear()
    history.push('/')
    }

    const onEditAccount = () => {
      // dispatch(labyrinth.actions.setLoading(true))  
      // const options = {
      //   method: 'Patch',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // }
  
      // fetch(API_URL(`users/${UserID}`), options)
      //   .then (response => response.json())
      //   .then (data => console.log(data))
      // .finally(() => dispatch(labyrinth.actions.setLoading(false)))
       }

    const onShowStatistics = () => {
      dispatch(user.actions.setLoading(true))   
          fetch(API_URL(`games`))
          .then(response => response.json())
          .then (data => console.log(data))
          .finally(() => dispatch(user.actions.setLoading(false)))
          //data.filter(data.player1 === UserID)
    }

  return (
    <>
    <NavBar />
      <Main>
        <InnerMain>
          {Loading? <Loader/> :
          <>          
            <h2>Min profil</h2>
            <p>Användarnamn: {LoggedInUser}</p>
            <p>Medlem sedan: </p>
            <StyledButton onClick={() => onShowStatistics()}>Mina fågelspaningar</StyledButton>
            <StyledButton onClick={() => onEditAccount()}>Redigera profil</StyledButton>
            
            {showConfirmation? <div>
              <p>Är du säker?</p>
              <StyledButton onClick={() => onDeleteAccount()}>Ja, ta bort mitt konto</StyledButton>
              <StyledButton onClick={() => setShowConfirmation(false)}>Avbryt</StyledButton>
            </div> 
            : <StyledButton onClick={() => setShowConfirmation(true)}>Ta bort konto</StyledButton>}        
            <ProfileImage />
            </>
          }
          </InnerMain>
      </Main>
    </>
  )
}

// Add possibility to edit something on profile and the delete functionality should be on the edit page/component
