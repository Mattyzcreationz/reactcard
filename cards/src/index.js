import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import reportWeb from './reportweb';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <app/>
        </React.StrictMode>
);

reportWeb();