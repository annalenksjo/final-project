import express from 'express'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import multer from 'multer'
import cloudinaryFramework from 'cloudinary'
import listEndpoints from 'express-list-endpoints'
import cloudinaryStorage from 'multer-storage-cloudinary'

const cloudinary = cloudinaryFramework.v2; 
  cloudinary.config({
  cloud_name: 'mittbildmoln',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = cloudinaryStorage({
  cloudinary,
  params: {
    folder: 'pets',
    allowedFormats: ['jpg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
})

const parser = multer({ storage })
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
  info: {
    type: String,
    default: ''
  },
  memberSince: {
    type: Date,
    default: Date.now
  },
  birdsSeen: [{
    type: mongoose.Schema.Types.ObjectId, 
    default: [],
    ref: 'Birds'
  }]
})

const Birds = mongoose.model('Birds', {
    name:  String, 
    image: String,
    description: String,
  }
)

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

const port = process.env.PORT || 8080
const app = express()
app.use(cors())
app.use(express.json())

// GET REQUESTS
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

app.get('/birds', authenticateUser)
app.get('/birds', async (req, res) => {
  const { birdsearch } = req.query
  try {
    let allBirds = await Birds.find().sort({ name: 1 }) 
    if (birdsearch) {
      allBirds = allBirds.filter((birds) => birds.name.toLowerCase().includes(birdsearch.toLowerCase())
      )
      res.json(allBirds)
    } else {
      res.json(allBirds)
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error})
  }   
})

app.get('/birds/:_id', authenticateUser)
app.get('/birds/:_id', async (req, res) => {
  const { _id } = req.params
  try {    
    if (_id) {
      const birdPage = await Birds.findById(_id)
      res.json(birdPage)
    } else {
      res.status(404).json({ error: 'Not found' })
    }
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' })
  }
})

// app.get('/users', authenticateUser)
app.get('/users', async (req, res) => {
  const { useraccount } = req.query

  try {
    // const { birdsSeenLength } = birdsSeen.lenght

    let allUsers = await User.find({}, {password: 0, accessToken: 0}).sort({ birdsSeen : -1 }) 
    let topUsers = await User.find({}, {password: 0, accessToken: 0}).sort({ birdsSeen: -1 })
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

// app.get('/users/:_id', authenticateUser)
app.get('/users/:_id', async (req, res) => {
  const { _id } = req.params
  try {    
    if (_id) {
      const userPage = await User.findById(_id)
      const birdArray = []
      for(const bird of userPage.birdsSeen) {
        const birdObject = await Birds.findById(bird)
        birdArray.push(birdObject)
      } 
      res.json({
        info: userPage.info,
        username: userPage.username,
        memberSince: userPage.memberSince,
        _id: userPage._id,
        birdsSeen: birdArray
      })
    } else {
      res.status(404).json({ error: 'Not found' })
    }
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' })
  }
})

// DELETE REQUESTS

app.delete('/users/:_id', authenticateUser)
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

// POST REQUESTS

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
      res.status(409).json({ success: false, message: 'Användarnamnet finns redan, prova ett annat', error })
    } else {
      res.status(400).json({ success: false, message: 'Något gick fel, prova igen', error })
    }    
  }
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (user && bcrypt.compareSync(password, user.password)) {
        res.json({
          success: true,
          userID: user._id,
          username: user.username,
          accessToken: user.accessToken,
          info: user.info,
          memberSince: user.memberSince,
          birdsSeen: user.birdsSeen
        })
       } else {
          res.status(404).json({ success: false, message: 'Fel användarnamn eller lösenord, prova igen.' })
      }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Något gick fel, prova igen', error });
  }
})

app.post('/users/:_id/addbird', authenticateUser)
app.post('/users/:_id/addbird', async (req, res) => {
  const { _id } = req.params
  const { birdId } = req.body  

  try {
    const birdToAdd = await Birds.findById(birdId)

    if (req.user.birdsSeen.includes(birdId) && !birdToAdd) {
      res.status(404).json({ success: false, message: 'Någonting gick fel, kanske har du redan denna fågeln i din samling?' })
    } else {
      await User.findByIdAndUpdate(_id, {
        $push: {
          birdsSeen: birdToAdd
        }
      })
      res.status(200).json({ success: true, message: 'Tillagd!', User})
    }
    
  } catch (error) {
    res.status(400).json({ success: false, message: 'Någonting gick fel, kanske har du redan denna fågeln i din samling?', error })
  }
})

app.post('/birds', parser.single('image'), async (req, res) => {
	res.json({ imageUrl: req.file.path, imageId: req.file.filename})
})

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
