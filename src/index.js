import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context/AuthProvider';
import Helper from './Components/Helper';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    
    <AuthProvider>
      <Helper>
      <BrowserRouter>
    <App />
    </BrowserRouter>
    </Helper>
    </AuthProvider>
     
  </React.StrictMode>
  
  
);

 
