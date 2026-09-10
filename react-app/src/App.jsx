import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Lesson from './pages/Lesson';
import Profile from './pages/Profile';
import Premium from './pages/Premium';
import ProtectedRoute from './components/ProtectedRoute';
import CyberDuels from './pages/CyberDuels';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/challenges"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lesson"
          element={
            <ProtectedRoute>
              <Lesson />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/premium"
          element={
            <ProtectedRoute>
              <Premium />
            </ProtectedRoute>
          }
        />

        <Route
          path="/duels"
          element={
            <ProtectedRoute>
              <CyberDuels />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;