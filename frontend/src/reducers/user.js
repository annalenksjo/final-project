import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name:'user',
  initialState: {
    loggedInUser: localStorage.getItem('loggedInUser') 
    ? JSON.parse(localStorage.getItem('loggedInUser'))
    : null,
    accessToken: null,
    username: null,
    password: null,
    errors: null,
    browsedUser:  localStorage.getItem('browsedUser') 
    ? JSON.parse(localStorage.getItem('browsedUser'))
    : null,
    browsedBird: localStorage.getItem('browsedBird') 
    ? JSON.parse(localStorage.getItem('browsedBird'))
    : null,
    message: null,
    loading: false,
  }, 

  reducers: {
    setloggedInUser: (store, action) => {
      store.loggedInUser = action.payload
      window.localStorage.setItem('loggedInUser', JSON.stringify(action.payload))
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setUsername: (store, action) => {
      store.username = action.payload
    },
    setPassword: (store, action) => {
      store.password = action.payload
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
    setBrowsedBird: (store, action) => {
      store.browsedBird = action.payload
      window.localStorage.setItem('browsedBird', JSON.stringify(action.payload))
    },
    setLoading: (store, action) => {
      store.loading = action.payload
    }
  }
})

export default user