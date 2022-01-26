// Import required node modules
const express = require('express');
const router = express.Router();

// Import required local modules
const indexController = require('../controllers/index.controller');

// @route   GET /
// @desc    gets index with date from api
// @access  public
router.get('/', indexController.get);

// @route   POST /verify
// @desc    verify age and id
// @access  public
router.post('/verify', indexController.verify);

// Exports router
module.exports = router;