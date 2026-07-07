import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Toaster} from './components/ui/toaster'
import { Provider } from './components/ui/provider'
import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}> 
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
