import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name:'user',
  initialState: {
    username: null,
    accessToken: localStorage.getItem('accessToken') 
      ? localStorage.getItem('accessToken') 
      : null,
    userID: null,
    errors: null,
    browsedUser: null,
    message: null
  }, 
  reducers: {
    setUsername: (store, action) => {
      store.username = action.payload
    }, 
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
      window.localStorage.setItem('accessToken', action.payload)
    },
    setUserID: (store, action) => {
      store.userID = action.payload
    }, 
    setErrors: (store, action) => {
      store.errors = action.payload
    },
    setUserMessage: (store, action) => {
      store.message = action.payload
    },
    setBrowsedUser: (store, action) => {
      store.browsedUser = action.payload
    }
  }
})

export default user