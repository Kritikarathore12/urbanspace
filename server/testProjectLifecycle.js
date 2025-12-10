const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:5000/api';
// Use the screenshot we took earlier as a valid image
const IMAGE_PATH = 'C:/Users/vidit shrama/.gemini/antigravity/brain/0d2ffe76-f878-4e6b-bce6-7b952fe51514/landing_page_working_final_png_1765334559125.png';

async function testLifecycle() {
    try {
        console.log('1. Logging in...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            username: 'admin',
            password: 'admin123'
        });
        const token = loginRes.data.token;
        console.log('   Logged in. Token acquired.');

        console.log('2. Creating Project...');
        const form = new FormData();
        form.append('title', 'Test Project Auto');
        form.append('description', 'Created by automation script');
        form.append('image', fs.createReadStream(IMAGE_PATH));

        const createRes = await axios.post(`${API_URL}/projects`, form, {
            headers: {
                ...form.getHeaders(),
                'x-auth-token': token
            }
        });
        const projectId = createRes.data._id;
        console.log(`   Project Created. ID: ${projectId}`);
        console.log(`   Image Path stored: ${createRes.data.image}`);

        console.log('3. Verifying Creation...');
        const listRes1 = await axios.get(`${API_URL}/projects`);
        const exists = listRes1.data.find(p => p._id === projectId);
        if (exists) {
            console.log('   Project found in list. SUCCESS.');
        } else {
            console.error('   Project NOT found in list. FAILURE.');
            return;
        }

        console.log('4. Deleting Project...');
        await axios.delete(`${API_URL}/projects/${projectId}`, {
            headers: { 'x-auth-token': token }
        });
        console.log('   Delete request successful.');

        console.log('5. Verifying Deletion...');
        const listRes2 = await axios.get(`${API_URL}/projects`);
        const stillExists = listRes2.data.find(p => p._id === projectId);
        if (!stillExists) {
            console.log('   Project no longer in list. DELETE SUCCESS.');
        } else {
            console.error('   Project STILL in list. DELETE FAILURE.');
        }

    } catch (error) {
        console.error('TEST FAILED:', error.response?.data || error.message);
    }
}

testLifecycle();
