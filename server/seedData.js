const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('./models/Project'); // Adjust path as needed
const Client = require('./models/Client');   // Adjust path as needed

// Data extracted from LandingPage.jsx
const projects = [
    {
        title: 'E-Commerce Redesign',
        description: 'A complete overhaul of a fashion retailer website using Next.js and Shopify.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'Fintech Dashboard',
        description: 'Real-time analytics dashboard for a banking client with complex data visualization.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'AI Health App',
        description: 'Mobile-first application leveraging AI for personalized health recommendations.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800'
    }
];

const clients = [
    {
        name: 'Sarah Johnson',
        designation: 'CEO, TechFlow',
        description: 'Exceptional work! The team delivered beyond our expectations.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
    },
    {
        name: 'Michael Chen',
        designation: 'CTO, StartUp Inc',
        description: 'Professional, creative, and timely. Highly recommended.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
    },
    {
        name: 'Emily Davis',
        designation: 'Director, ArtSpace',
        description: 'The new design completely revitalized our brand.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Clear existing data to ensure clean state as requested
        await Project.deleteMany({});
        await Client.deleteMany({});
        console.log('Old data cleared');

        await Project.insertMany(projects);
        console.log('Projects Seeded');

        await Client.insertMany(clients);
        console.log('Clients Seeded');

        console.log('Data Seeding Completed');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
