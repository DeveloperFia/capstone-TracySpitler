// include
const express = require('express');
const router = express.Router()

// default page
router.get('/', (req, res, next) => {
    // send hello world
    res.send('<h1>Hello World</h1>');
})

// set up router
module.exports = router;
