import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './layouts/Dashboard';
import InicioPage from './pages/InicioPage';
import ServiciosPage from './pages/ServiciosPage';
import NosotrosPage from './pages/NosotrosPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { ProductosPage } from './pages/ProductosPage';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard/inicio\" replace />} />
        <Route path="inicio" element={<InicioPage />} />
        <Route path="servicios" element={<ServiciosPage />} />
        <Route path="nosotros" element={<NosotrosPage />} />
        <Route path="productos" element={<ProductosPage />} />
      </Route>
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
    </Routes>
  );
}

export default App;