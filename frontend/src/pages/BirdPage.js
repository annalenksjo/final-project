import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { API_URL } from '../urls/urls'
import user from 'reducers/user'
import { Loader } from '../components/Loader'
import { StyledButton } from '../components/Button'
import { NavBar } from '../components/NavBar'
import { Header } from '../components/Header'
import { Subtext } from '../components/Subtext'
import { Main, InnerMainLoggedIn, AboutSection } from 'components/MainContainers'

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

  const alreadyAdded = loggedInUserBirdsArray.includes(browsedBird._id)

     return (
      <Main>
        <InnerMainLoggedIn>
        {Loading? <Loader/> :
          <>
            <NavBar/>
            <Header>{birdData.name}</Header>
            <AboutSection>
              <img src={birdData.image} alt={birdData.name}/>
              <Subtext>{birdData.description}
              <br></br><br></br>
              {alreadyAdded?
              <>Du har redan denna fågel i din samling.</>
                :
                <>
                {added? 
                <Subtext>Tillagd!</Subtext>
                :
                <StyledButton onClick={() => onAddBird()}>
                  Lägg till i min samling
                </StyledButton>
              }
              </>
              }
              <br></br>
              <StyledButton onClick={() => history.go(-1)}>Tillbaka</StyledButton>
              </Subtext>
            </AboutSection>
          </>
        }
        </InnerMainLoggedIn>      
      </Main>
    )
}