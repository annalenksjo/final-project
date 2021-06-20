import React from "react"
import { Provider } from 'react-redux'
import {configureStore, combineReducers } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { StartPage } from "pages/Main"
import { LogIn } from "pages/LogIn"
import { Profile } from "pages/Profile"
import { SignUp } from "pages/SignUp"
import { Users } from "pages/Users"
import { GardenBirds } from "pages/GardenBirds"
import { BirdPage } from "pages/BirdPage"
import { HamburgerMenuOpen } from "pages/HamburgerMenuOpen"

import user from './reducers/user'
import { UserPage } from "pages/UserPage"


const reducer = combineReducers({
  user: user.reducer
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
            <Route path='/' exact>
              <StartPage/>
            </Route>
            <Route path='/loggain'> 
              <LogIn/>
            </Route>
            <Route path='/skapakonto'> 
              <SignUp/>
            </Route>
            <Route path='/meny'> 
              <HamburgerMenuOpen/>
            </Route>
            <Route path='/minsida'> 
              <Profile/>
            </Route>
            <Route path='/topplistan'> 
              <Users/>
            </Route>
            <Route path='/users/:userid'> 
              <UserPage/>
            </Route>
            <Route path='/fagelbiblioteket' exact> 
              <GardenBirds/>
            </Route>
            <Route path='/fagelbiblioteket/:birdid'> 
              <BirdPage/>
            </Route>    
        </Switch>
        </Provider>
    </BrowserRouter>
  )}
