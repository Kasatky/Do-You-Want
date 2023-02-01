import React from 'react';
import { useSelector } from 'react-redux';
import LandingPage from '../pages/LandingPage';
import { RootState } from '../store';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicRoute from '../Wrappers/PublicRoute';
import ProtectedRoute from '../Wrappers/ProtectedRoute';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/ProfilePage';
import CabinetAdmin from '../CabinetAdminPage/CabinetAdmin';
import AudioMeditationPage from '../pages/AudioMeditationPage';

function App() {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const role = useSelector((state: RootState) => state.user.profile?.role);
  const isAdmin = role === 1;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute isAuth={isAuth} isAdmin={isAdmin}>
                <LandingPage />
              </PublicRoute>
            }
          />
          <Route path="/audioMeditation" element={<AudioMeditationPage />} />
          {/* сюда потом можно закинуть админа */}
          <Route element={<ProtectedRoute isAuth={isAuth} />}>
            <Route path="/dashboard" element={<DashboardPage />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/admin" element={<CabinetAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
