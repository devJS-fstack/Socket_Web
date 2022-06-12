const express = require('express');
const router = express.Router();
const path = require('path');
const ChatController = require('../controllers/chat.controller.js')

router.get('/', ChatController.homepage);
router.get('/api/message', ChatController.message);



module.exports = router;