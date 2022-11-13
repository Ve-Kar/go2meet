import App from './App';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter,  Route, Routes } from 'react-router-dom';
import { FavoritesContextProvider } from './store/favorites-contex';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
  <FavoritesContextProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </FavoritesContextProvider>
</React.StrictMode>
);


 

