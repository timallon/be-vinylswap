const express = require("express");
const jwt = require("jsonwebtoken");
const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const User = require('../models/User.model');
const Record = require('../models/Record.model');
const Comment = require('../models/Comment.model');
const router = require('express').Router();
//const isAuthenticated = require('../middleware/isAuthenticated')



// POST /auth/signup  - Creates a new user in the database
router.post('/signup', async(req, res, next) => {

  const { email, userName, password } = req.body;

  if (email === '' || userName ==='' || password === '') {
    res.status(400).json({ message: "Provide email, username and/or password" });
    return;
  }

// Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Provide a valid email address.' });
    return;
  }

// Use regex to validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
    return;
  }
// If the user with the same username already exists, send an error response
const foundUserName = await User.findOne({userName: userName.toLowerCase()});

  if (foundUserName) {
        res.status(400).json({ message: "Sorry, this user name is taken." });
        return;
      }



  // If the user with the same email already exists, send an error response
const foundEmail = await User.findOne({email});

  if (foundEmail) {
        res.status(400).json({ message: "This email is already registered." });
        return;
      }
      

// If email is unique, proceed to hash the password
const salt = genSaltSync(10)
const hashedPassword = hashSync(password, salt)
console.log(hashedPassword)

// Create the new user in the database

await User.create({ email, userName: userName.toLowerCase(), password: hashedPassword })
res.status(201).json({ message: 'User created' })

})
/*
router.post('/login', async(req, res, next) => {
  const { email, password } = req.body;

   if (email === '' || password === '') {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

// Check the users collection if a user with the same email exists

const currentUser = await User.findOne({ email })

console.log(currentUser)

// Check if our user exists

 if (currentUser) {
  
// Check the password of our user
  if (compareSync(password, currentUser.hashedPassword)) {
    const userCopy = { ...currentUser._doc }
    delete userCopy.hashedPassword

// Generate the JWT (don't forget to put a secret in your .env file)
    const authToken = jwt.sign(
      {
        expiresIn: '6h',
        user: userCopy,
      },
      process.env.TOKEN_SECRET,
      {
        algorithm: 'HS256',
      }
    )

    res.status(200).json({ status: 200, token: authToken })
  } else {
    res.status(400).json({ message: 'Wrong password' })
  }
} else {
  res.status(404).json({ message: 'No user with this username' })
}
})


// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get('/verify', isAuthenticated, (req, res, next) => {   

// If JWT token is valid the payload gets decoded by the
// isAuthenticated middleware and made available on `req.payload`
  console.log(`req.payload`, req.payload);

// Send back the object with user data
// previously set as the token payload
 
  res.status(200).json({ payload: req.payload, message: 'Token OK' })
});
*/

module.exports = router