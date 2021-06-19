import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { API_URL } from '../urls/urls'
import user from 'reducers/user'
import { Loader } from '../components/Loader'
import { StyledButton } from '../components/Button'
import { Dialog } from '../components/Dialog'
import { NavBar } from '../components/NavBar'
import { Subtext } from '../components/Subtext'
import { Main, InnerMainLoggedIn, OnClickDiv } from 'components/MainContainers'
import { Container, ListContainer } from './GardenBirds'

export const UserPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const browsedUser = useSelector(store => store.user.browsedUser)
  const Loading = useSelector(store => store.user.loading)

  const BirdArray = browsedUser.birdsSeen
  
  useEffect(() => {
    dispatch(user.actions.setLoading(true))
    const fetchUserProfile = () => {
        fetch(API_URL(`users/${browsedUser._id}`))
        .then(response => response.json())
        .then (data => dispatch(user.actions.setBrowsedUser(data)))
        .finally(() => dispatch(user.actions.setLoading(false)))
    }
    fetchUserProfile()
  },[])

  const onGetBirdPage = (action) => {
    dispatch(user.actions.setLoading(true))
    dispatch(user.actions.setBrowsedBird(action))
    dispatch(user.actions.setLoading(false))
    console.log(action)
    history.push(`/fagelbiblioteket/${action.name}`)
  }

  if(browsedUser) {
    return (
      <Main>
        <InnerMainLoggedIn>
        {Loading? <Loader/> :
          <>
            <NavBar/>
            <h2>Användarnamn: {browsedUser.username}</h2>
            
            {BirdArray.length === 0 ? <Subtext>
              {browsedUser.username} verkar inte ha några spaningar i sin lista ännu.
            </Subtext>

            :
            <>
            <Subtext>Sedda fåglar: {browsedUser.birdsSeen.length}/40</Subtext>
            <Container>                           
            <ListContainer>
              {browsedUser.birdsSeen && browsedUser.birdsSeen.map(bird =>
                <OnClickDiv 
                  key={bird._id} 
                  onClick={() => onGetBirdPage(bird)}
                >
                  <Dialog
                      key={bird._id}
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
          </>
            }
            <StyledButton onClick={() => history.push('/topplistan')}>Tillbaka</StyledButton>
          </>
        }
        </InnerMainLoggedIn>      
      </Main>
    )   
  }
 else {
    return (
      <></>
    )
  }
}