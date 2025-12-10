const axios = require('axios');

async function getToken() {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
            username: 'admin',
            password: 'admin123'
        });
        console.log('TOKEN:', res.data.token);
    } catch (error) {
        console.error('Login Error:', error.response?.data || error.message);
    }
}

getToken();
