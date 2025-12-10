const Client = require('../models/Client');

// @desc    Get all clients
// @route   GET /api/clients
// @access  Public
exports.getClients = async (req, res) => {
    try {
        const clients = await Client.find().sort({ createdAt: -1 });
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a client
// @route   POST /api/clients
// @access  Private
exports.createClient = async (req, res) => {
    try {
        const { name, designation, description } = req.body;
        let image = '';

        if (req.file) {
            image = req.file.path.replace(/\\/g, "/");
        } else {
            return res.status(400).json({ message: 'Client image is required' });
        }

        const client = await Client.create({
            name,
            designation,
            description,
            image
        });

        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a client
// @route   DELETE /api/clients/:id
// @access  Private (Admin)
exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        await client.deleteOne();
        res.json({ message: 'Client removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
