const router = require("express").Router();
const Record = require("../models/Record.model");
const User = require('../models/User.model');
//const Comment = require('../models/Comment.Model');
//const jwt = require("jsonwebtoken");
//const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/', async(req, res, next) => {
    const books = await Record.find()
    res.json( [ ...books ] )
});

router.post('/', async (req, res, next) => {
    console.log('record route')
    
    
      const { title, author, yearPublished, genre, image } = req.body;
       
        console.log(req.body.record)
        const record = await Record.create({
            title: req.body.title,
//            author: req.body.author,
//            author: req.body.author,
//            yearPublished: req.body.yearPublished,
//            genre: req.body.genre,
//            genre: req.body.language,
//            image: req.body.image,

        })
      
        res.status(201).json({ message: 'Record created' })
      });





module.exports = router;

