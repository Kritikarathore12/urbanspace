const Subscriber = require('../models/Subscriber');

// @desc    Subscribe to newsletter
// @route   POST /api/subscribe
// @access  Public
exports.subscribe = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if already subscribed
        const existing = await Subscriber.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }

        const subscriber = await Subscriber.create({ email });
        res.status(201).json({ message: 'Subscribed successfully', subscriber });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all subscribers
// @route   GET /api/subscribe
// @access  Private (Admin)
exports.getSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find().sort({ createdAt: -1 });
        res.status(200).json(subscribers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
