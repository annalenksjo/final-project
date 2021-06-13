import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name:'user',
  initialState: {
    username: localStorage.getItem('username') 
    ? localStorage.getItem('username') 
    : null,
    accessToken: localStorage.getItem('accessToken') 
      ? localStorage.getItem('accessToken') 
      : null,
    userID: localStorage.getItem('userID') 
    ? localStorage.getItem('userID') 
    : null,
    errors: null,
    browsedUser:  localStorage.getItem('browsedUser') 
    ? JSON.parse(localStorage.getItem('browsedUser'))
    : null,
    message: null,
    loading: false
  }, 
  // maybe add reducer for game? 
  // or add under object for userinfo
  reducers: {
    setUsername: (store, action) => {
      store.username = action.payload
      window.localStorage.setItem('username', action.payload)
    }, 
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
      window.localStorage.setItem('accessToken', action.payload)
    },
    setUserID: (store, action) => {
      store.userID = action.payload
      window.localStorage.setItem('userID', action.payload)
    }, 
    setErrors: (store, action) => {
      store.errors = action.payload
    },
    setUserMessage: (store, action) => {
      store.message = action.payload
    },
    setBrowsedUser: (store, action) => {
      store.browsedUser = action.payload
      window.localStorage.setItem('browsedUser', JSON.stringify(action.payload))
    },
    setLoading: (store, action) => {
      store.loading = action.payload
    }
  }
})

export default user