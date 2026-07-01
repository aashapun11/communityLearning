import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Provider } from './components/ui/provider'
import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}> 
    <Route path="/dashboard" element={<Dashboard />} />
    </Route>
    
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
