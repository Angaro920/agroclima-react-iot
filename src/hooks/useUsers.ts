import { useState } from "react";
import type { UserType } from "../types";
import { BACKEND_URL } from "../constants/urls";

export const useUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // GET - Obtener todos los usuarios
  const getUsers = async () => {
    try {
      const response = await fetch(BACKEND_URL+"/api/listUsers");
      if (!response.ok) throw new Error("Error al obtener usuarios");

      const data = await response.json();
      setUsers(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  // GET - Obtener usuario por ID
  const getUserById = async (id: string) => {
    if (!id || id === "undefined") throw new Error("ID no válido");

    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/listUser/${id}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Error al obtener usuario");

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };


  // POST - Crear usuario
  const createUser = async (userData: UserType) => {
    setLoading(false);
    try {
      const response = await fetch(BACKEND_URL+"/api/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Error al crear usuario");

      const newUser = await response.json();
      setUsers((prev) => [...prev, newUser]);
      return newUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // PUT - Actualizar usuario
  const updateUser = async (id: string, userData: Partial<UserType>) => {
    setLoading(false);
    try {
      const response = await fetch(BACKEND_URL+`/api/updateUser/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Error al actualizar usuario");

      const updatedUser = await response.json();
      setUsers((prev) =>
        prev.map((user) => (user._id === id ? updatedUser : user))
      );
      return updatedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // DELETE - Eliminar usuario
  const deleteUser = async (id: string) => {
    setLoading(true);
    console.log(id)
    try {
      const response = await fetch(
        BACKEND_URL+`/api/deleteUser/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Error al eliminar usuario");

      setUsers((prev) => prev.filter((user) => user._id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };
};
