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
import About from './components/About';
import Notification from './components/Notification';
import Challenges from './pages/Challenges';
import ChallengeDetails from './pages/ChallengeDetails';
import CheckIn from './components/checkIns/CheckInForm';
import CreateChallenge from './pages/CreateChallenge';
import UpdateChallenge from './pages/UpdateChallenge';
import ChallengesCategory from './pages/ChallengesCategory'
import CategoryDetails from './components/CategoryDetails';
import TopicChallenges from './pages/TopicChallenges'
import Landing from './components/Landing';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}> 
    <Route index element={<Landing />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/about" element={<About />} />
    <Route path="/notifications" element={<Notification />} />
    {/* <Route path="/challenges" element={<Challenges />} /> */}
    <Route path="/challengesCategory" element={<ChallengesCategory />} />
    <Route path="/challenges/:challengeId" element={<ChallengeDetails />} /> 
    <Route path="/categories/:slug" element={<CategoryDetails />} />
    <Route path="/getChallengesByTopic/:topic" element={<TopicChallenges />} />


    <Route path="/checkIns/:challengeId" element={<CheckIn />} />
    <Route path="/createChallenge" element={<CreateChallenge />} />
    <Route path="/updateChallenge/:challengeId" element={<UpdateChallenge />} />
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
