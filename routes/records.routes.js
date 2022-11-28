const router = require("express").Router();
const Record = require("../models/Record.model");
const User = require('../models/User.model');
//const Comment = require('../models/Comment.Model');
const jwt = require("jsonwebtoken");
const isAuthenticated = require('../middleware/isAuthenticated');
const uploader = require('../middleware/cloudinary.config.js');

router.get('/', async(req, res, next) => {
  const records = await Record.find()
  res.json( [ ...records ] )
});

router.post('/upload', isAuthenticated, uploader.single("imageUrl"), async (req, res, next) => {
  // the uploader.single() callback will send the file to cloudinary and get you and obj with the url in return
  console.log('image url: ', req.file.path)
  console.log('req.body.title: ', req.body.title)
  const { path } = req.file;
  const { title, artist, yearReleased, label, genre } = req.body;
  await Record.create({ title, image: path, artist, yearReleased, label, genre })
  const user = await User.findById(req.payload.user._id)
  console.log('session user: ', user)
        
  if (!req.file) {
    console.log("there was an error uploading the file")
    next(new Error('No file uploaded!'))
    return;
  }
  
  // You will get the image url in 'req.file.path'
  // Your code to store your url in your database should be here
})
      
module.exports = router;

