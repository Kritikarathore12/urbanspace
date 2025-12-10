const express = require('express');
const router = express.Router();
const { submitContact, getContacts } = require('../controllers/contactController');

const auth = require('../middleware/auth');

router.post('/', submitContact);
router.get('/', auth, getContacts);

module.exports = router;
