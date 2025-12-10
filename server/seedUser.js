const axios = require('axios');

async function seedUser() {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/register', {
            username: 'admin',
            password: 'admin123'
        });
        console.log('User created:', res.data);
    } catch (error) {
        if (error.response) {
            console.log('Error:', error.response.data);
        } else {
            console.error('Error connecting to server:', error.message);
        }
    }
}

seedUser();
