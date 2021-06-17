import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { API_URL } from '../urls/urls'
import user from 'reducers/user'
import { Loader } from '../components/Loader'
import { StyledButton } from '../components/Button'
import { NavBar } from '../components/NavBar'
import { Main } from './Main'
import { InnerMain } from './Main'

export const BirdPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [birdData, setBirdData] = useState ({})

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
  },[])

     return (
      <Main>
        <InnerMain>
        {Loading? <Loader/> :
          <>
            <NavBar/>
            <h2>{birdData.name}</h2>
            <img src={birdData.image}/>
            <p>{birdData.description} </p>
            <StyledButton onClick={() => history.push('/tradgardsfaglar')}>Tillbaka</StyledButton>
          </>
        }
        </InnerMain>      
      </Main>
    )
}