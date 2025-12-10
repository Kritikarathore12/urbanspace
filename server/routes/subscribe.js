const express = require('express');
const router = express.Router();
const { subscribe, getSubscribers } = require('../controllers/subscribeController');

const auth = require('../middleware/auth');

router.post('/', subscribe);
router.get('/', auth, getSubscribers);

module.exports = router;
