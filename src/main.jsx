import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { initializeApp } from "firebase/app";
import './index.css'
import App from './components/App.jsx'

const firebaseConfig = {
    apiKey: "AIzaSyAcrtfIifeDBQN32fwrfIhAYulH4-aVsYg",
    authDomain: "careerpivot-89976.firebaseapp.com",
    projectId: "careerpivot-89976",
    storageBucket: "careerpivot-89976.firebasestorage.app",
    messagingSenderId: "66012159714",
    appId: "1:66012159714:web:67d226af97621dd30c88bb",
    measurementId: "G-SBT4Q73WTY"
  };

const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
