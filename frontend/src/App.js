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
            <Route path='/loggain' exact> 
              <LogIn/>
            </Route>
            <Route path='/skapakonto' exact> 
              <SignUp/>
            </Route>
            <Route path='/profile' exact> 
              <Profile/>
            </Route>
            <Route path='/toplist' exact> 
              <Users/>
            </Route>
            <Route path='/users/:userid'> 
              <UserPage/>
            </Route>
            <Route path='/tradgardsfaglar' exact> 
              <GardenBirds/>
            </Route>
            <Route path='/tradgardsfaglar/:birdid'> 
              <BirdPage/>
            </Route>    
        </Switch>
        </Provider>
    </BrowserRouter>
  )}
