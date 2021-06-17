import React, { useEffect, useState, Component } from 'react'
import Polaroid from "react-polaroid";
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { API_URL } from '../urls/urls'
import { StyledButton } from '../components/Button'
import { NavBar } from '../components/NavBar.js'
import { Main } from '../pages/Main'
import { InnerMain } from '../pages/Main'
import { Form } from '../components/Form'
import { Input } from '../components/Input'
import { blue } from '@material-ui/core/colors';
import user from 'reducers/user'


export const GardenBirds = () => {
  const [birdList, setBirdList] = useState([])
  //const [birdSearch, setBirdSearch] = useState('')
  const [chosenBird, setChosenBird] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const loggedInUserID = useSelector(store => store.user.loggedInUser.userID)

  const onAddBird = () => {
    fetch(API_URL(`users/${loggedInUserID}/addbird/`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        birdId : chosenBird
      })
    })
    .then (response => response.json())
    .then (data => console.log(data))
  }
  
  useEffect(() => {
    const fetchGardenBirds = () => {
      fetch (API_URL('birds'))
      .then(response => response.json())
      .then(data => setBirdList(data))
    }
    fetchGardenBirds()
  },[])

  const onGetBirdPage = (action) => {
    dispatch(user.actions.setLoading(true))
    dispatch(user.actions.setBrowsedBird(action))
    dispatch(user.actions.setLoading(false))
    console.log(action)
    history.push(`/tradgardsfaglar/${action.name}`)
  }

  return (
  <>
    <NavBar/>
    <BirdsListMain>
      <InnerMain>
        <h1>Här är 40 av våra vanligaste svenska fåglar</h1>
        <h3>Tryck på bilden för mer information om fågeln!</h3>
        {/* <Form >
          <label> Sök fågel:
            <Input 
            type="text"
            onChange={(event) => setBirdSearch(event.target.value)}
            value={birdSearch} 
            />
          </label>
          <StyledButton type="submit"><span aria-label="magnifying glass emoji" role="img">🔍</span></StyledButton>
          {birdList.length === 0 ? <p>Hittade inga fåglar!</p> : '' }
        </Form> */}
        <Container>
        {birdList.map(bird => (
          <>
          <ListContainer key={bird._id}>
          <StyledPolaroid
            imgSrc={bird.image}
            height={500}            
            width={500}
            frontText={bird.name}
            backText={bird.description}
            value={bird._id}
            onClick={() => onGetBirdPage(bird)}
            style={
              {
                fontSize: 24,
              }
            }
          />
          <StyledButton
            onClick={(event) => {
              onAddBird(event.target.value)
              setChosenBird(event.target.value)
              }}             
            value={bird._id}>
            Lägg till i samling</StyledButton>
          </ListContainer>
          {/* <BirdListContainer>
                <h2>{bird.name}</h2>
                <BirdImg src={bird.image}/>
                <p>{bird.description}</p>
                <StyledButton 
                  onClick={(event) => {
                    onAddBird()
                    setChosenBird(event.target.value)
                  }}             
                  value={bird.name}
                >              
                Lägg till i samling
                </StyledButton>
          </BirdListContainer> */}
          </>

        ))}
        </Container>
      </InnerMain>
    </BirdsListMain> 
  </>     
  )
}

export const Container = styled.section` 
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
export const ListContainer = styled.div`
  width: auto;   
  display: flex;
  flex-direction: column;
  margin: 20px;
  justify-content: center;
  align-items: center;
`

export const BirdsListMain = styled(Main)`
  display: flex;
  justify-content: center;
`

export const StyledPolaroid = styled(Polaroid)`
  margin: 40px;
`

const BirdImg = styled.img`
  :hover {
    opacity: 0.8;
  }
`
