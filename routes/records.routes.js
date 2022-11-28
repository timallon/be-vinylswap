const router = require("express").Router();
const Record = require("../models/Record.model");
const User = require('../models/User.model');
//const Comment = require('../models/Comment.Model');
//const jwt = require("jsonwebtoken");
//const isAuthenticated = require('../middleware/isAuthenticated');
const uploader = require('../middleware/cloudinary.config.js');


router.get('/', async(req, res, next) => {
    const books = await Record.find()
    res.json( [ ...books ] )
});



      router.post('/upload', uploader.single("imageUrl"), async (req, res, next) => {
        // the uploader.single() callback will send the file to cloudinary and get you and obj with the url in return
        console.log('file is: ', req.file)
        console.log('req.body.title: ', req.body.title)
        const { title } = req.body;
        await Record.create({ title })

        
        if (!req.file) {
          console.log("there was an error uploading the file")
          next(new Error('No file uploaded!'))
          return;
        }
        
        // You will get the image url in 'req.file.path'
        // Your code to store your url in your database should be here
      })
      
      // router.post('/upload', async (req, res, next) => {
      //   const { title } = req.body;
      //   await Record.create({ title })
      //   res.status(201).json({ message: 'Record created' })
      //     console.log('req.body:', req.body)
          
          
      // //       const { title, author, yearPublished, genre, image } = req.body;
             
      // //         console.log(req.body.record)
      // //         const record = await Record.create({
      // //             title: req.body.title,
      // // //            author: req.body.author,
      // // //            author: req.body.author,
      // // //            yearPublished: req.body.yearPublished,
      // // //            genre: req.body.genre,
      // // //            genre: req.body.language,
      // // //            image: req.body.image,
      
      // //         })
            
      //       });




module.exports = router;

