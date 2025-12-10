const upload = require('./middleware/upload');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

console.log('Checking Upload Middleware Config...');

if (upload.storage instanceof CloudinaryStorage) {
    console.log('PASS: Storage engine is CloudinaryStorage');
} else {
    console.error('FAIL: Storage engine is NOT CloudinaryStorage. Type:', upload.storage.constructor.name);
    process.exit(1);
}

const cloudConfig = upload.storage.cloudinary.config();
if (cloudConfig.cloud_name && cloudConfig.api_key) {
    console.log(`PASS: Cloudinary configured with cloud_name: ${cloudConfig.cloud_name}`);
} else {
    console.error('FAIL: Cloudinary config missing credentials');
    process.exit(1);
}

console.log('READY FOR DEPLOYMENT');
