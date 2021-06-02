import React from "react"
import { Provider } from 'react-redux'
import {configureStore, combineReducers } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import { StartPage } from "pages/Main"
import { Profile } from "pages/Profile"

const Main = styled.main` 
display: flex;
flex-direction: column;
height: 100vh;
width: 100vw;
justify-content: center;
align-items: center;
background-color: lightgrey;
box-sizing: border-box;
font-family: "Now Bold";
color: #6A7885;
`
// const reducer = combineReducers({
//   user: user.reducer
// })

// const store = configureStore({ reducer })

export const App = () => {
  return (
    <BrowserRouter>
        <Switch>
          <Main>
            <Route path='/' exact>
              <StartPage/>
            </Route>     
            <Route path='/profile' exact> 
              <Profile/>
            </Route>   
          </Main>
        </Switch>
    </BrowserRouter>
  )}
