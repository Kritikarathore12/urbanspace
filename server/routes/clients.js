const express = require('express');
const router = express.Router();
const { getClients, createClient, deleteClient } = require('../controllers/clientController');
const upload = require('../middleware/upload');

const auth = require('../middleware/auth');

router.get('/', getClients);
router.post('/', auth, upload.single('image'), createClient);
router.delete('/:id', auth, deleteClient);

module.exports = router;
