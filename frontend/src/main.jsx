import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store.js';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <ToastContainer
      position="bottom-center" // Positioning of the toast
      autoClose={5000}          // Timeout in ms
      hideProgressBar={false}   // Show progress bar
      newestOnTop={false}       // Display newest toast at the top
      closeOnClick={true}       // Close on click
      rtl={false}               // Right-to-left support
      pauseOnFocusLoss={false}  // Don't pause when focus is lost
      draggable={true}          // Allow dragging
      pauseOnHover={true}       // Pause on hover
    />
  </Provider>
);
