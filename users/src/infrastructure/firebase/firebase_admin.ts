import * as admin from 'firebase-admin';
import * as path from 'path';

const serviceAccountPath = path.join(process.cwd(), 'firebase-admin-sdk.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });
}

export const firebaseAdmin = admin;
