import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import listEndpoints from 'express-list-endpoints'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/challengeAppAPI'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

// next step: add Challenge model & get for challenge
// add authentication on those endpoints 
// em: start on FE

// const Challenge = mongoose.model('Challenge', {
//   name: {
//     type: String
//   },
//   image: {
//     type: String // url or file
//   },
//   description: {
//     type: String
//   },
//   goal: {
//     type: Number
//   },
//   prize: {
//     type: String
//   }
// })

// const Game = mongoose.model('Game', {
//   challenge: {
//     // get object from the chosen challenge
//   },
//   players: {
//      user1Object: {
//       win: {
//         type: Boolean
//       },
//       score: {
//         type: Number
//       }
//     },
//      user2Object: {
//       win: {
//         type: Boolean
//       },
//       score: {
//         type: Number
//       }
//     }
//   },
//   active: {
//     type: Boolean,
//   }
// })

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
  }
})

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// GET
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

app.get('/users', async (req, res) => {
  // to filter on useraccounts -> users?useraccount='value'
  // should only send username (not accesT & pw)
  const { useraccount } = req.query

  try {
    let allUsers = await User.find()

    if (useraccount) {
      allUsers = allUsers.filter((user) => user.username.toLowerCase()
        .includes(useraccount.toLowerCase())
      )
    }    
      res.json(allUsers)
      // if there is no user (array.lenght = 0) räcker det o visa detta i FE?
  } catch (error) {
      res.status(400).json({ success: false, message: 'Invalid request', error})
  }
})

// DELETE

// PATCH

// POST

// USER REGISTER
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
      res.status(400).json({ success: false, message: 'Sorry! Invalid request', error })
    }    
  }
});

// USER LOGIN

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

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
