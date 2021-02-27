const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig')
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');

//GET functionality for populating joke list including comedian name, un-laugh button, laugh count 
router.get('/', (req, res) => {
  db.comedian.findAll()
    .then((comedians) => {
      db.topic.findAll()
      .then((topics) => {
        db.user.findOne({
        where: {id: req.user.id}, 
        include: [db.joke]
      }).then((user) => {
        // console.log("--------", user.dataValues.jokes[0].dataValues.content)
        res.render('favorites.ejs', {user: user, allTopics: topics, allComedians: comedians, currentUser: req.user});
      // }).catch((error) => {
      //   console.log('Error in GET /', error)
      //   res.status(400).render('main/404')
      })
    })  
  })
});

//=== ADD LAUGH BUTTON===//
//POST functionality for adding a laugh
// router.post('/addjoke/:id', async (req, res) => {
//   try {
//     const foundJoke = await db.joke.findByPk(req.params.id)
//     foundJoke.likes = foundJoke.likes + 1
//     foundJoke.save()
//     const foundUser = await db.user.findByPk(1)     //REMEMBER TO change to req.user.id
//     foundUser.addJoke(foundJoke)
//     console.log('===========')
//     console.log(foundUser.name, 'has faved', foundJoke.content)
//     res.redirect('/favorites')
//   } catch (error) {
//     req.flash('error', error.message)
//     res.redirect('/favorites')
//   }	 
// })


//POST functionality for un-laugh
router.post('/takejoke/:id', async (req, res) => {
  try {
    const foundJoke = await db.joke.findByPk(req.params.id)
    foundJoke.likes = foundJoke.likes - 1
    foundJoke.save()  
    const foundUser = await db.user.findByPk(req.user.id)
    foundUser.removeJoke(foundJoke)
    console.log('===========')
    console.log(foundUser.name, 'has removed', foundJoke.content)
    res.redirect('/favorites') 
  } catch (error) {
    req.flash('error', error.message)
    res.redirect('/favorites')
  }	 
})

// ##### NOT TESTED YET ############//
//DELETE favorite joke from user list
// router.delete('/deletejoke/:id', function(req, res) {
//   db.joke.destroy({
//     where: {id: req.params.id}
//   }).then(function(){
//     res.redirect('/favorites')
//   })
// })

module.exports = router;
