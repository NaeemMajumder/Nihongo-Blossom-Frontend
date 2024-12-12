import admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

// Assuming .env file is used
import dotenv from 'dotenv';
dotenv.config();

const serviceAccountPath = path.resolve(import.meta.env.VITE_FIREBASE_PRIVATE_KEY_PATH);
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
