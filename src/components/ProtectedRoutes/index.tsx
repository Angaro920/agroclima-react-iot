import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../hooks/useAuthUser";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) return <p>Cargando...</p>; // Muestra un mensaje de carga
  if (!user) return <Navigate to="/login" />; // Redirige al login si no hay usuario

  return <>{children}</>; // Renderiza el contenido si el usuario está autenticado
};

export default ProtectedRoute;