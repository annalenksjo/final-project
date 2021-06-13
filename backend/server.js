import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import listEndpoints from 'express-list-endpoints'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import dotenv from 'dotenv'

import avatarData from './avatars.json'
import birdData from './gardenbirds.json'

dotenv.config()

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/challengeAppAPI'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  username: {
    type: String, 
    required: true,
    unique: true,
    trim: true,
    minlenght: 3,
    maxlenght: 30
  },
  password: {
    type: String,
    required: true,
    minlenght: 5,
    maxlenght: 25
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  },
  profileImg: {
    type: String
  },
  motto: {
    type: String,
    default: ''
  },
  memberSince: {
    type: Date,
    default: Date.now
  },
  birdsSeen: {
    type: Number,
    default: 0
  }
})

// const Game = mongoose.model('Game', {
//   player1: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   player2: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//     active: {
//     type: Boolean,
//     default: true
//   },
//     win: {
//     type: Boolean,
//     default: null
//   },
//     gameStarted: {
//     type: Date,
//     default: Date.now
//   }
// })

// *** AVATAR SCHEMA & MODEL

const AvatarImage = mongoose.model('AvatarImage', {
  name:  String,
  url: String
  }
)

const GardenBirds = mongoose.model('gardenBirds', {
  art:  String
  }
)

// const { Schema } = mongoose;
// const avatarSchema = new Schema({
// })
// END AVATAR SCHEMA & MODEL ***
// *** CHALLENGE SCHEMA & MODEL

// const { Schema } = mongoose;

//   const challengeSchema = new Schema({
//     title:  {
//       type: String,
//       required: true,
//     },
//     author: String, // name of challenge creator
//     description: String,
//     comments: [{ body: String, date: Date }], // comments from other users?
//     date: { type: Date, default: Date.now },
//     active: Boolean,
//     meta: {
//       popularity: Number,
//       players:  Number
//     }
//   });

// const Challenge = mongoose.model('Challenge', challengeSchema);

// END CHALLENGE SCHEMA & MODEL ***



  const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization')

  try {
    const user = await User.findOne({ accessToken })
    if (user) {
      req.user = user
      next()
    } else {
      res.status(401).json({ success: false, message: 'Not authorized' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
}

const port = process.env.PORT || 9090
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// GET
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

// Get User Avatars
app.get('/avatars', async (req, res) => {
  const avatars = avatarData
  res.json(avatars)
})

// Get Gardenbirds
app.get('/gardenbirds', async (req, res) => {
  const gardenBirds = birdData
  res.json(gardenBirds)
})

//Get Games
app.get('/games', async (req, res) => {
  // add param so can display stats. Previous games & ongoing game
  let allGames = await Game.find()
  res.json(allGames)
})

// Get Games for one user
// app.get('/games/:_id', authenticateUser)
app.get('/games/:_id', async (req, res) => {
  const { _id } = req.params
  // Now it finds the game with a specific ID

  try {    
    if (_id) {
      const userGames = await Game.findById(_id)
      res.json(userGames)
    } else {
      res.status(404).json({ error: 'Not found' })
    }
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' })
  }
})

// Get User List
// app.get('/users', authenticateUser)
app.get('/users', async (req, res) => {

  const { useraccount } = req.query

  try {
    let allUsers = await User.find({}, {password: 0, accessToken: 0}).sort({ birdsSeen: -1 }) 
    let topUsers = await User.find({}, {password: 0, accessToken: 0}).sort({ birdsSeen: -1 }).limit(10)

    if (useraccount) {
      allUsers = allUsers.filter((user) => user.username.toLowerCase()
        .includes(useraccount.toLowerCase())
      )
      res.json(allUsers)
    } else {
      res.json(topUsers)
    }
      
  } catch (error) {
      res.status(400).json({ success: false, message: 'Invalid request', error})
  }
})

// Get User Profile
// app.get('/users/:_id', authenticateUser)
app.get('/users/:_id', async (req, res) => {
  const { _id } = req.params

  try {    
    if (_id) {
      const userPage = await User.findById(_id)
      res.json(userPage)
    } else {
      res.status(404).json({ error: 'Not found' })
    }
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' })
  }
})

// DELETE
// Delete User
// app.delete('/users/:_id', authenticateUser)
app.delete('/users/:_id', async (req, res) => {
  const { _id } = req.params
  try {
    const deletedAccount = await User.findByIdAndDelete(_id)
    if(deletedAccount) {
      res.json({
        success: true,
        deletedAccount 
      })
    } else {
      res.status(404).json({ success: false, message: 'Sorry, something went wrong', error })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'invalid request', error })
  }
})

//Delete game
// app.delete('/games/:_id', authenticateUser)
app.delete('/games/:_id', async (req, res) => {
  const { _id } = req.params
  try {
    const deletedGame = await Game.findByIdAndDelete(_id)
    if(deletedGame) {
      res.json({
        success: true,
        deletedGame 
      })
    } else {
      res.status(404).json({ success: false, message: 'Sorry, something went wrong', error })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'invalid request', error })
  }
})

// PATCH
// Edit User Profile
// app.patch('/users/:_id', authenticateUser)
app.patch('/users/:_id', async (req, res) => {
  const { _id } = req.params
  try {
    const updatedAccount = await User.findByIdAndUpdate(_id, {
      // specify what the user can update, such as:
      motto: req.body.motto
    },
    {
      // new: true // to return the new document and not the orginal one
    }
    )
    if(updatedAccount) {
      res.json({
        success: true,
        updatedAccount 
      })
    } else {
      res.status(404).json({ success: false, message: 'Sorry, something went wrong', error })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'invalid request', error })
  }
})

// POST
// User Register
app.post('/register', async (req, res) => {
  const { username, password } = req.body

  try {
    const salt = bcrypt.genSaltSync()
  
      const newUser = await new User({
        username,
        password: bcrypt.hashSync(password, salt)
      }).save()
  
      res.json({
        success: true,
        userID: newUser._id,
        user: newUser.username,
        accessToken: newUser.accessToken
      })
     
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ success: false, message: 'Username already exists', error })
    } else {
      res.status(400).json({ success: false, message: 'Could not create user', error })
    }    
  }
})

// User Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    
    if (user && bcrypt.compareSync(password, user.password)) {
        res.json({
          success: true,
          userID: user._id,
          username: user.username,
          accessToken: user.accessToken,
        })
    } else if (user && !bcrypt.compareSync(password, user.password)) {
      res.status(404).json({ success: false, message: 'Wrong password'})
    } // Maybe remove this for security reasons
      else {
      res.status(404).json({ success: false, message: 'Username not found' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Sorry! Invalid request', error });
  }
})

// Add birdsSeen
// app.post('/users/:_id/addbird', authenticateUser)
app.post('/users/:_id/addbird', async (req, res) => {
  const { _id } = req.params
  
  try {
    const updatedBirds = await User.findByIdAndUpdate( {_id}, {$inc: { birdsSeen:1 }} )
    if(updatedBirds) {
      res.json({
        success: true,
        updatedBirds 
      })
    } else {
      res.status(404).json({ success: false, message: 'Sorry, something went wrong', error })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'invalid request', error })
  }
})

//New Game
app.post('/games', async (req, res) => {
  // one player should only be able to have one active game
  const { player1, player2 } = req.body
 
  try {
        const newGame = await new Game({
        player1,
        player2
        //  player1: User.findOne(user => user.username),
        //  player2: User.findOne(user => user.username)
      }).save()
  
      res.json({
        success: true,
        game: newGame
      })
     
  } catch (error) {
     res.status(400).json({ success: false, message: 'Could not create game', error }) 
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
