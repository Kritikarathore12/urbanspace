const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function verify() {
    try {
        console.log('1. Logging in...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            username: 'admin',
            password: 'admin123'
        });
        const token = loginRes.data.token;
        const config = { headers: { 'x-auth-token': token } };

        console.log('2. Verifying Projects Reset...');
        let projects = (await axios.get(`${API_URL}/projects`)).data;
        console.log(`   Project Count: ${projects.length}`);
        if (projects.length !== 3) throw new Error(`Expected 3 projects, found ${projects.length}`);
        const hasQwen = projects.find(p => p.title.toLowerCase().includes('qwen'));
        if (hasQwen) throw new Error('Project "qwen" still exists!');
        console.log('   Projects Reset: PASS');

        console.log('3. Verifying Clients Reset...');
        let clients = (await axios.get(`${API_URL}/clients`)).data;
        console.log(`   Client Count: ${clients.length}`);
        if (clients.length !== 3) throw new Error(`Expected 3 clients, found ${clients.length}`);
        console.log('   Clients Reset: PASS');

        console.log('4. Testing Project Deletion...');
        const pId = projects[0]._id;
        await axios.delete(`${API_URL}/projects/${pId}`, config);
        projects = (await axios.get(`${API_URL}/projects`)).data;
        if (projects.length !== 2) throw new Error('Project deletion failed (count did not decrease)');
        console.log('   Project Deletion: PASS');

        console.log('5. Testing Client Deletion...');
        const cId = clients[0]._id;
        await axios.delete(`${API_URL}/clients/${cId}`, config);
        clients = (await axios.get(`${API_URL}/clients`)).data;
        if (clients.length !== 2) throw new Error('Client deletion failed (count did not decrease)');
        console.log('   Client Deletion: PASS');

        console.log('ALL CHECKS PASSED');

    } catch (error) {
        console.error('VERIFICATION FAILED:', error.response?.data || error.message);
        process.exit(1);
    }
}

verify();
