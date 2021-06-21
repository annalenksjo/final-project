import React, { useEffect, useState } from 'react'
import Polaroid from "react-polaroid";
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import { API_URL } from '../urls/urls'
import { StyledButton } from '../components/Button'
import { NavBar } from '../components/NavBar.js'
import { Main, InnerMainLoggedIn, OnClickDiv, ProfileInfoDiv } from '../components/MainContainers'
import { UserSearchForm } from '../components/Form'
import { Input } from '../components/Input'
import { Header, HThree } from '../components/Text'
import { Dialog } from '../components/Dialog'
import { Footer } from '../components/Footer'
import user from 'reducers/user'

const TopInfoDiv = styled(ProfileInfoDiv)`
  height: 300px;
  justify-content: space-evenly;
  @media (min-width: 768px) {
    height: 450px;
  }
`

export const Container = styled.section` 
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
`

export const ListContainer = styled.div`
  width: auto;   
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media(min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`

export const BirdsListMain = styled(Main)`
  display: flex;
  justify-content: center;
  padding-top: 200px;
`

const Wrapper = styled(OnClickDiv)`
  @media(min-width: 768px) {
    max-width: 30%;
    min-width: min-content;
  }
  @media(min-width: 1024px) {
    min-width: 25%;
    max-width: 25%;
  }
`

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
    <Main>
      <InnerMainLoggedIn>
        <TopInfoDiv>
        <Header>Fågelbiblioteket</Header>
        <HThree>Sök i biblioteket efter din fågelspaning, finns den med?
          Tryck på bilden för mer information om fågeln, och lägg till den i din spaningslista. 
          <br></br><br></br>
          Kom ihåg, ju fler fåglar du sett ju högre upp kommer du på topplistan!</HThree>
        </TopInfoDiv>
        <UserSearchForm onSubmit={onSearch}>
            <Input 
              type="text"
              onChange={(event) => setBirdSearch(event.target.value)}
              value={birdSearch}
              placeholder="Sök" 
            />
          <StyledButton type="submit"><span aria-label="magnifying glass emoji" role="img">🔍</span></StyledButton>
        </UserSearchForm>
        {birdList.length === 0 ? <HThree>Hittade inga fåglar!</HThree> : '' }
        <Container>
        {birdList.map(bird => (
          <Wrapper 
            onClick={() => onGetBirdPage(bird)}             
            value={bird._id}
            key={bird._id}
            >
            <Dialog
              title={bird.name}
              image={bird.image}
            />
          </Wrapper>
        ))}
        </Container>
        <Footer/>
      </InnerMainLoggedIn>
    </Main> 
  </>     
  )
}


