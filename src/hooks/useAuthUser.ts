import { useState, useEffect } from "react";

interface User {
  id: string;
  username: string;
  tag: string;
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      const response = await fetch("https://vulnerability-enb-die-builder.trycloudflare.com/api/getUser", {
        credentials: "include",
      });

      if (!response.ok) throw new Error("No autorizado");

      const data: User = await response.json();
      setUser(data);
      setLoading(false);
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