import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/index.tsx'
import { persistor } from './store/index.tsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { injectStore } from './config/axiosConfig.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Modal from 'react-modal';

// Set the app element to the root element of your application
Modal.setAppElement('#root');

injectStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </LocalizationProvider>
  // </React.StrictMode>,
)
