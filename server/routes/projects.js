const express = require('express');
const router = express.Router();
const { getProjects, createProject, deleteProject } = require('../controllers/projectController');
const upload = require('../middleware/upload');

const auth = require('../middleware/auth');

router.get('/', getProjects);
router.post('/', auth, upload.single('image'), createProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;
