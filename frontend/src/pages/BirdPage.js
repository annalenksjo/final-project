import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import { API_URL } from '../urls/urls'
import user from 'reducers/user'
import { Loader } from '../components/Loader'
import { StyledButton } from '../components/Button'
import { NavBar } from '../components/NavBar'
import { Header, HThree } from '../components/Text'
import { Footer } from '../components/Footer'
import { Main, InnerMainLoggedIn, AboutSection } from '../components/MainContainers'

const BirdPageInnerMain = styled(InnerMainLoggedIn)`
  @media(min-width: 768px) {
      flex-direction: column;
  }
`

const Content = styled(AboutSection)`
  @media(min-width: 768px) {
    margin: 40px 10px;
  } 
  @media (min-width: 1024px) {
    max-width: 1200px;
  }
`

const BirdImg = styled.img`
  max-height: 100%; 
  max-width: 100%;
  margin: 10px;
  @media (min-width: 768px) {
    width: 50%;
    margin: 0 10px;
  }
  @media (min-width: 1024px) {
    width: 40%;
    margin: 20px;
  }
`

const AdjustedHThree = styled(HThree)`
  padding: 5px;
  @media (min-width: 768px) {
    font-size: 16px;
  }
  @media (min-width: 1024px) {
    font-size: 20px;
    padding: 0 40px;
  }
  @media (min-width: 1440px) {
    font-size: 22px;
    padding: 0 40px;
  }
`

const Button = styled(StyledButton)`
  margin: 6px 0;
`

export const BirdPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [birdData, setBirdData] = useState ({})
  const [added, setAdded] = useState (false)

  const loggedInUserID = useSelector(store => store.user.loggedInUser.userID)
  const loggedInUserBirdsArray = useSelector(store => store.user.loggedInUser.birdsSeen)
  const Loading = useSelector(store => store.user.loading)
  const browsedBird = useSelector(store => store.user.browsedBird)
  
  useEffect(() => {
    dispatch(user.actions.setLoading(true))
    const fetchBirdPage = () => {
        fetch(API_URL(`birds/${browsedBird._id}`))
        .then(response => response.json())
        .then (data => setBirdData(data))
        .finally(() => dispatch(user.actions.setLoading(false)))
    }
    fetchBirdPage()
  },[browsedBird._id, dispatch])

  const onAddBird = () => {
    fetch(API_URL(`users/${loggedInUserID}/addbird/`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        birdId : browsedBird._id
      })
    })
    .then (response => response.json())
    .then (data => data.success? setAdded(true) : setAdded(false) )
  }

  const alreadyAdded = loggedInUserBirdsArray && loggedInUserBirdsArray.includes(browsedBird._id)

     return (
      <Main>
        {Loading? <Loader/> :
          <>
            <NavBar/>
            <BirdPageInnerMain>
              <Header>{birdData.name}</Header>
              <Content>
                <BirdImg src={birdData.image} alt={birdData.name}/>
                <AdjustedHThree>{birdData.description}
                <br></br><br></br>           
                </AdjustedHThree>
              </Content>
              {alreadyAdded?
                <AdjustedHThree>Du har redan denna fågel i din samling.</AdjustedHThree>
                  :
                  <></>
                } 
                {added? 
                  <AdjustedHThree> Tillagd! </AdjustedHThree>
                  :
                  <Button onClick={() => onAddBird()}>
                    Lägg till i min samling
                  </Button>
                }
                <Button onClick={() => history.go(-1)}>
                  Tillbaka
                </Button>
            </BirdPageInnerMain>
          </>
        }   
        <Footer/>     
      </Main>
    )
}