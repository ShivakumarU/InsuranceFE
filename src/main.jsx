import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom' ;
import { Toaster } from 'react-hot-toast';

const savedTheme = localStorage.getItem("theme") || "black";
document.documentElement.setAttribute("data-theme", savedTheme);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
