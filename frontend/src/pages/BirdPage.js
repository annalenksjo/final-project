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
      align-items: center;
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
const AddBirdDiv = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 20px 0;
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


export const BirdPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [birdData, setBirdData] = useState ({})
  const [added, setAdded] = useState (false)

  const loggedInUserID = useSelector(store => store.user.loggedInUser.userID)
  const loggedInUserBirdsArray = useSelector(store => store.user.loggedInUser.birdsSeen)
  const Loading = useSelector(store => store.user.loading)
  const browsedBird = useSelector(store => store.user.browsedBird)
  const error = useSelector(store => store.user.errors)
  
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
    dispatch(user.actions.setLoading(true))

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
    .then (data => {
    if (data.success) {
        setAdded (true) 
        dispatch(user.actions.setErrors(null))        
    } else {
      setAdded (false)
      dispatch(user.actions.setErrors(data))
    }
  })
  .catch()
  .finally(() => dispatch(user.actions.setLoading(false)))
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
              <AddBirdDiv>
              {error ? <HThree>{error.message}</HThree> : ''}
              {alreadyAdded? 
                  <AdjustedHThree>
                    Du har redan denna fågel i din samling.
                  </AdjustedHThree>
                : 
                  <>
                    {added? 
                      <AdjustedHThree> 
                        Tillagd! 
                      </AdjustedHThree>
                      : 
                      <StyledButton onClick={() => onAddBird()}>
                        Lägg till i min samling
                      </StyledButton>
                     }
                  </>
                } 
                
                
               
                <StyledButton onClick={() => history.go(-1)}>
                  Tillbaka
                </StyledButton>
              </AddBirdDiv>
            </BirdPageInnerMain>
          </>
        }   
        <Footer/>     
      </Main>
    )
}