import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// context Api
import { BrowserRouter } from 'react-router-dom'
import { FireBaseProvider } from './context/FirebaseSW';
import { useFirebase } from './context/FirebaseSW';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


  <FireBaseProvider>
    <App />
  </FireBaseProvider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

