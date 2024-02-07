import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/authenticate';
import { PicProvider } from './context/profileImg';
export const server = "http://localhost:3000";

const root = ReactDOM.createRoot(document.getElementById('root'));
document.body.classList.add("overflow-y-hidden");
root.render(


  <PicProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </PicProvider>


);

