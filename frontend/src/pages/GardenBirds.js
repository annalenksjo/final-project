import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import { API_URL } from '../urls/urls'
import { StyledButton } from '../components/Button'
import { NavBar } from '../components/NavBar.js'
import { Main, InnerMainLoggedIn, OnClickDiv, AboutSection } from '../components/MainContainers'
import { UserSearchForm } from '../components/Form'
import { Input } from '../components/Input'
import { Header, SubText } from '../components/Text'
import { Dialog } from '../components/Dialog'
import { Footer } from '../components/Footer'
import { Loader } from '../components/Loader'
import user from 'reducers/user'

const BirdLibraryImage = styled.img`
  width: 100%;
  margin: 15px 0 15px 0;
  @media (min-width: 768px) {
    width: 40%;
    margin: 15px 30px;
  }
  @media (min-width: 1024px) {
    width: 30%;
    margin: 0 50px 0 0;
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
  const [filterBirds, setFilterBirds] = useState(false)
  const accessToken = useSelector(store => store.user.loggedInUser.accessToken)
  const loggedInUserBirdsArray = useSelector(store => store.user.loggedInUser.birdsSeen)
  const Loading = useSelector(store => store.user.loading)
  const dispatch = useDispatch()
  const history = useHistory()
  
  useEffect(() => {
    const fetchGardenBirds = () => {
      if (!accessToken) {
        history.push('/')
      } else {
        const options = {
          method: 'GET',
          headers: {
            Authorization: accessToken
          }
        }
      fetch (API_URL('birds'), options)
      .then(response => response.json())
      .then(data => setBirdList(data))
      }
    }
    fetchGardenBirds()
  },[accessToken, history])

  const onGetBirdPage = (action) => {
    dispatch(user.actions.setLoading(true))
    dispatch(user.actions.setBrowsedBird(action))
    dispatch(user.actions.setLoading(false))
    history.push(`/fagelbiblioteket/${action.name}`)
  }

  const onSearch = (event) => {
    dispatch(user.actions.setLoading(true))
    event.preventDefault()

    const options = {
      method: 'GET',
      headers: {
        Authorization: accessToken
      }
    }

    fetch(API_URL(`birds?birdsearch=${birdSearch}`), options)
    .then(response => response.json())
    .then (data => setBirdList(data))
    .finally(() => dispatch(user.actions.setLoading(false)))
    setBirdSearch('')
  }

  return (
    <>
      <NavBar/>
      {Loading? 
        <Loader/> 
        : 
        <Main>
          <InnerMainLoggedIn>
            <Header>Fågelbiblioteket</Header>
            <AboutSection>
            <BirdLibraryImage src='https://res.cloudinary.com/mittbildmoln/image/upload/v1624353003/Bokmes_j72rga.png' alt='Fågel som läser en bok'/>
              <SubText>
                Sök i biblioteket efter din fågelspaning, finns den med?
                Tryck på bilden för mer information om fågeln, och lägg till den i din spaningslista. 
                Kom ihåg, ju fler fåglar du sett ju högre upp kommer du på topplistan!
              </SubText>
            </AboutSection>
            <UserSearchForm onSubmit={onSearch}>
                <Input 
                  type='text'
                  onChange={(event) => setBirdSearch(event.target.value)}
                  value={birdSearch}
                  placeholder='Fågelart'
                />
              <StyledButton type='submit'>Sök</StyledButton>
            </UserSearchForm>
            <UserSearchForm onSubmit={onSearch}>
              <label>
                <SubText>Dölj sedda fåglar</SubText>
                <Input 
                  type='checkbox'
                  // onChange={(event) => setBirdSearch(event.target.value)}
                  // value={birdSearch}
                  checked={filterBirds}
                  onClick={() => setFilterBirds(!filterBirds)}
                  placeholder='Fågelart'
                />
              </label>
            </UserSearchForm>
            {birdList.length === 0 ? 
              <SubText>Hittade inga fåglar!</SubText> 
              : 
              '' 
            }
            <Container>
              {filterBirds?
              <> 
            {birdList.filter(bird => !loggedInUserBirdsArray.includes(bird._id)).map(bird => (
              <Wrapper 
                onClick={() => onGetBirdPage(bird)}             
                value={bird._id}
                key={bird._id}
                >
                <Dialog
                  title={bird.name}
                  image={bird.image}
                  tag1={loggedInUserBirdsArray && loggedInUserBirdsArray.includes(bird._id) && '👀 ✔' }
                  // tag2={loggedInUserBirdsArray && loggedInUserBirdsArray.includes(bird._id) && '👀 ✔' }
                />
              </Wrapper>
            ))}
            </>
              :
              <>
              {birdList.map(bird => (
              <Wrapper 
                onClick={() => onGetBirdPage(bird)}             
                value={bird._id}
                key={bird._id}
                >
                <Dialog
                  title={bird.name}
                  image={bird.image}
                  tag1={loggedInUserBirdsArray && loggedInUserBirdsArray.includes(bird._id) && '👀 ✔' }
                  // tag2={loggedInUserBirdsArray && loggedInUserBirdsArray.includes(bird._id) && '👀 ✔' }
                />
              </Wrapper>
            ))}
              </>
          }
            </Container>
            <Footer/>
          </InnerMainLoggedIn>
        </Main>
      } 
    </>     
  )
}


