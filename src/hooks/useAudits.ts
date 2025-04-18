import { useState, useEffect } from "react";

export interface AuditType {
  usuario: string;
  accion: string;
  detalles?: any;
  fecha: string;
}

export const useAudits = () => {
  const [audits, setAudits] = useState<AuditType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAudits = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/listAudits", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Error al cargar auditorías");
      const data = await response.json();
      setAudits(data);
    } catch (error) {
      console.error("Error al obtener auditorías:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudits();
  }, []);

  return { audits, loading };
};

export default useAudits;