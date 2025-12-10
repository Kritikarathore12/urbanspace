const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private (Admin)
exports.createProject = async (req, res) => {
    try {
        const { title, description } = req.body;
        let image = '';

        if (req.file) {
            image = req.file.path.replace(/\\/g, "/"); // Normalize path
        } else {
            return res.status(400).json({ message: 'Image is required' });
        }

        const project = await Project.create({
            title,
            description,
            image
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await project.deleteOne();
        res.json({ message: 'Project removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
