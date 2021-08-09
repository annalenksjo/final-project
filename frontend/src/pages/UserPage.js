import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import { API_URL } from '../urls/urls'
import user from 'reducers/user'
import { Loader } from '../components/Loader'
import { StyledButton } from '../components/Button'
import { Dialog } from '../components/Dialog'
import { NavBar } from '../components/NavBar'
import { Header, SubText } from 'components/Text'
import { Footer } from '../components/Footer'
import { Main, InnerMainLoggedIn, OnClickDiv, ProfileInfoDiv, StyledDivRow } from 'components/MainContainers'
import { ProfileImage } from 'components/ProfileImage'
import { Container, ListContainer } from './GardenBirds'

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

export const UserPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const browsedUser = useSelector(store => store.user.browsedUser)
  const accessToken = useSelector(store => store.user.loggedInUser.accessToken)
  const Loading = useSelector(store => store.user.loading)

  const BirdArray = browsedUser.birdsSeen
  
  useEffect(() => {
    dispatch(user.actions.setLoading(true))
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
        fetch(API_URL(`users/${browsedUser._id}`), options)
        .then(response => response.json())
        .then (data => dispatch(user.actions.setBrowsedUser(data)))
        .finally(() => dispatch(user.actions.setLoading(false)))
      }
    }
    fetchUserProfile()
  }, [browsedUser._id, dispatch, accessToken, history])

  const onGetBirdPage = (action) => {
    dispatch(user.actions.setLoading(true))
    dispatch(user.actions.setBrowsedBird(action))
    dispatch(user.actions.setLoading(false))
    history.push(`/fagelbiblioteket/${action.name}`)
  }

  if(browsedUser) {
    return (
      <>
        {Loading? <Loader/> :
        <Main>
        <InnerMainLoggedIn>          
          <NavBar/>
          <ProfileInfoDiv>
            <ProfileImage/>
            <Header>{browsedUser.username}</Header>
          </ProfileInfoDiv>
          <StyledDivRow>
            <StyledButton onClick={() => history.push('/topplistan')}>Tillbaka</StyledButton>
          </StyledDivRow>
          {BirdArray.length === 0 ? 
            <SubText> {browsedUser.username} verkar inte ha några spaningar i sin lista ännu. </SubText>
            :
            <>
              <SubText>Sedda fåglar: {browsedUser.birdsSeen.length}/40</SubText>
              <Container>                           
                <ListContainer>
                  {browsedUser.birdsSeen && browsedUser.birdsSeen.map(bird =>
                  (
                    <Wrapper 
                      key={bird._id} 
                      onClick={() => onGetBirdPage(bird)}
                    >
                      <Dialog
                          title={bird.name}
                          image={bird.image}
                        />   
                    </Wrapper>       
                  ))}
                  
                </ListContainer>
              </Container>
            </>
          }         
          <Footer/>
        </InnerMainLoggedIn>      
        </Main>
        }
      </>
    )   
  }
 else {
    return (
      <></>
    )
  }
}