import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { API_URL } from '../urls/urls'
import { StyledButton } from '../components/Button'
import { NavBar } from '../components/NavBar.js'
import { Main } from '../pages/Main'
import { InnerMain } from '../pages/Main'
import { Form } from '../components/Form'
import { Input } from '../components/Input'


export const GardenBirds = () => {
  const [birdList, setBirdList] = useState([])
  const [birdSearch, setBirdSearch] = useState('')

  const loggedInUserID = useSelector(store => store.user.userID)

  const onAddBird = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }

   fetch(API_URL(`users/${loggedInUserID}/addbird`), options)
    .then (response => response.json())
    .then (data => console.log(data))
     //Add to array on user
    //increase number om profile by 1
  }
  
  useEffect(() => {
    const fetchGardenBirds = () => {
      fetch (API_URL('gardenbirds'))
      .then(response => response.json())
      .then(data => setBirdList(data))
    }
    fetchGardenBirds()
  },[])


  return (
  <>
    <NavBar/>
    <BirdsListMain>
      <InnerMain>
        <h1>Trädgårdsfåglar</h1>
        <Form >
          <label> Sök fågel:
            <Input 
            type="text"
            onChange={(event) => setBirdSearch(event.target.value)}
            value={birdSearch} 
            />
          </label>
          <StyledButton type="submit"><span aria-label="magnifying glass emoji" role="img">🔍</span></StyledButton>
          {/* {userList.length === 0 ? <p>Hittade inga fåglar!</p> : '' } */}
        </Form>
        <BirdContainer>
        {birdList.map(bird => (
          <BirdListContainer>
            <h3>{bird.art}</h3>
            <img src="data:image/jpeg;base64,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"></img>
            <StyledButton onClick={() => onAddBird()}>Lägg till i samling</StyledButton>
          </BirdListContainer>
        ))}
        </BirdContainer>
      </InnerMain>
    </BirdsListMain> 
  </>     
  )
}

const BirdContainer = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const BirdListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  border: 1px solid black;
`

const BirdsListMain = styled(Main)`
  display: flex;
  justify-content: center;
`
