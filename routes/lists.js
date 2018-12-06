// include
const express = require('express');
const router = express.Router()

// all lists page
router.get('/lists', (req, res, next) => {
    // render pug template - signup
    res.render('all-lists');
})

// set up router
module.exports = router;
