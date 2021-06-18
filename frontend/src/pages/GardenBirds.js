import React, { useEffect, useState } from 'react'
import Polaroid from "react-polaroid";
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { API_URL } from '../urls/urls'
import { StyledButton } from '../components/Button'
import { NavBar, NavLink } from '../components/NavBar.js'
import { Main, InnerMainLoggedIn, OnClickDiv } from '../components/MainContainers'
import { SearchForm } from '../components/Form'
import { Input } from '../components/Input'
import { Header } from '../components/Header'
import { Subtext } from '../components/Subtext'
import { Dialog } from '../components/Dialog'
import user from 'reducers/user'


export const GardenBirds = () => {
  const [birdList, setBirdList] = useState([])
  const [birdSearch, setBirdSearch] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  
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
    history.push(`/fagelbiblioteket/${action.name}`)
  }

  const onSearch = (event) => {
    dispatch(user.actions.setLoading(true))
    event.preventDefault()

    fetch(API_URL(`birds?birdsearch=${birdSearch}`))
    .then(response => response.json())
    .then (data => setBirdList(data))
    .finally(() => dispatch(user.actions.setLoading(false)))

    setBirdSearch('')
  }

  return (
  <>
    <NavBar/>
    <BirdsListMain>
      <InnerMainLoggedIn>
        <Header>Här är 40 av våra vanligaste svenska fåglar</Header>
        <Subtext>Sök i biblioteket efter din fågelspaning, finns den med?<br></br>
          Tryck på bilden för mer information om fågeln, och lägg till den i din spaningslista. 
          <br></br><br></br>
          Kom ihåg, ju fler fåglar du sett ju högre upp kommer du på topplistan!</Subtext>
        <SearchForm onSubmit={onSearch}>
            <Input 
            type="text"
            onChange={(event) => setBirdSearch(event.target.value)}
            value={birdSearch}
            placeholder="Sök" 
            />
          <StyledButton type="submit"><span aria-label="magnifying glass emoji" role="img">🔍</span></StyledButton>
          {birdList.length === 0 ? <p>Hittade inga fåglar!</p> : '' }
        </SearchForm>
        <Container>
        {birdList.map(bird => (
          <OnClickDiv 
            onClick={() => onGetBirdPage(bird)}             
            value={bird._id}
            key={bird._id}
            >
            <Dialog
              title={bird.name}
              image={bird.image}
            />
          </OnClickDiv>
        ))}
        </Container>
      </InnerMainLoggedIn>
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
