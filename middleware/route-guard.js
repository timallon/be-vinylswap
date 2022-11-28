
// middleware/route-guard.js
 
// checks if the user is logged in when trying to access a specific page
const isConnected = (req, res, next) => {
    if (!req.session.user) {
       res.redirect('/login');
    } else {
      next();
    }
    
  };
   
  // if an already logged in user tries to access the login page it
  // redirects the user to the home page
  const isLoggedOut = (req, res, next) => {
    if (req.session.user) {
       res.redirect('/');
    } else {
      next();
    }
  
  };
   
  module.exports = {
    isConnected,
    isLoggedOut
  };
 