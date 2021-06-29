const express = require('express')
const router = express.Router()

//@desc Login/Landing page
//@ route Get /
router.get('/', (req, res) => {
  res.send('Login')
})

router.get('/dashboard', (req, res) => {
  res.send('Dashboard')
})

module.exports = router
