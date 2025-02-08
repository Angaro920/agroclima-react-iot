import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthResponse {
  token: string;
  user: {
    id: string;
    userName: string;
    role: string;
  };
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Función para iniciar sesión
  const login = async (userName: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
        credentials: "include", 
      });

      if (!response.ok) throw new Error("Credenciales inválidas");

      const data: AuthResponse = await response.json();
      localStorage.setItem("token", data.token); 
      navigate("/"); 
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        credentials: "include", 
      });
      localStorage.removeItem("token"); 
      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      throw err;
    }
  };

  return { login, logout, loading, error };
};