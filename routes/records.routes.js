const router = require("express").Router();
const Record = require("../models/Record.model");
const User = require('../models/User.model');
const Comment = require('../models/Comment.model');
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
  const newRecord = await Record.create({ title, image: path, artist, yearReleased, label, genre })
  const user = await User.findByIdAndUpdate(req.payload.user._id, {$push:{record:newRecord._id}}, {new:true})
  console.log('session user: ', user)
        
  if (!req.file) {
    console.log("there was an error uploading the file")
    // next(new Error('No file uploaded!'))
    return;
  }
  res.status(200).json(newRecord)
})


router.post('/:id', async(req, res) => {
  const { id } = req.params;
  const record = await Record.findById(id);
  const { title , description } = req.body;
  const newComment = await Comment.create( { title, description, recordId: record } )
  record.comment.push(newComment)
  await record.save()

  res.status(200).json(newComment)

})
// GET route to retrieve and display details of a specific record:
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const record = await Record.findById(id).populate("comment")
    res.json({ ...record._doc })
  } catch (error) {
    res.status(404).json({ message: 'No record with this id' })
  }
})

//Edit pre-existing record
router.put('/:id/update', uploader.single("imageUrl"), async (req, res, next) => {
  console.log("req.file: ", req.file, req.body)
  console.log("req.body: ", req.body)
  const { id } = req.params
  const body = {...req.body }
  const image = {image:req.file.path}
  

  const record = await Record.findByIdAndUpdate(id, body, image, { new: true })

  res.json({ record })
})

router.delete('/:id/delete', async (req, res, next) => {
  const { id } = req.params
  const record = await Record.findByIdAndDelete(id)

  res.json(record)
})

      
module.exports = router;

