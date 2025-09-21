'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'studio-6632516410-acf52',
  appId: '1:979725386167:web:9649072a37aebc157ae832',
  apiKey: '',
  authDomain: 'studio-6632516410-acf52.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '979725386167'
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
