const Contact = require('../models/Contact');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res) => {
    try {
        const { fullName, email, mobile, city } = req.body;
        const contact = await Contact.create({
            fullName,
            email,
            mobile,
            city
        });
        res.status(201).json({ message: 'Contact submitted successfully', contact });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private (Admin)
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
