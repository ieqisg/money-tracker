import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import "./index.css"
import App from './router/App'
import { AuthProvider } from './context/authContext'
import { Toaster } from 'react-hot-toast'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position='bottom-center'
          toastOptions={{
            duration: 3000,
            success: {
              style: {
                color: 'green'
              }
            },
            error: {
              style: {
                color: 'red'
              }
            }
          }}
        />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
