import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import listEndpoints from 'express-list-endpoints'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

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
    maxlenght: 30,
  },
  password: {
    type: String,
    required: true,
    minlenght: 5,
    maxlenght: 25,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
})


const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here

//GET
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

app.get('/users', async (req, res) => {
  // needs to have a query for the user to filter on users
  const { useraccount } = req.query
  ///users?user='value'

  let allUsers = await User.find()

  if (useraccount) {
    allUsers = allUsers.filter(user => user.username.toLowerCase().includes(useraccount.toLowerCase()))
  }    
    res.json(allUsers)
    
  //   } else {
  //     res.status(404).json({ error: 'No users found'})
  //   } // Is this triggered if the user array is 0 after quering for users?
    
  // } catch (error) {
  //   res.status(400).json({error: 'Not found'})
  // }
})


//DELETE

//PATCH

//POST

// USER REGISTER
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync();

    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt),
    }).save();

    res.json({
      success: true,
      userID: newUser._id,
      user: newUser.username,
      accessToken: newUser.accessToken,
    });
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
    }
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
