// hooks/useAuthUser.ts
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants/urls";
import type { UserType } from "../types"; // Asegúrate de que este archivo contenga la interfaz completa

export const useUser = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/getUser`, {
        credentials: "include", // Importante si usas cookies para autenticación
      });

      if (!response.ok) throw new Error("No autorizado");

      const raw = await response.json();

      const data: UserType = {
        id: raw.id,
        userName: raw.username, // ✅ mapeo correcto al formato esperado
        tag: raw.tag,
        name: raw.name,
        email: raw.email,
        documento: raw.documento,
        age: raw.age,
        grade: raw.grade,
        password: "",
        confirmPassword: "",
      };

      setUser(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, error };
};
