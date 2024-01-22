import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import AuthProvider from './context/AuthContext';

const root = document.getElementById('root');
const rootInstance = createRoot(root);
rootInstance.render(<AuthProvider><App/></AuthProvider>);