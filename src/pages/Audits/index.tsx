import { Table } from "antd";
import { useAudits } from "../../hooks/useAudits";
import type { ColumnsType } from "antd/es/table";

export const AuditsPage = () => {
  const { audits, loading } = useAudits();

  const columns: ColumnsType<any> = [
    {
      title: "Usuario",
      dataIndex: "usuario",
      key: "usuario",
    },
    {
      title: "Acción",
      dataIndex: "accion",
      key: "accion",
    },
    {
      title: "Detalles",
      dataIndex: "detalles",
      key: "detalles",
      render: (value) => (
        <pre style={{ whiteSpace: "pre-wrap", fontSize: "0.75rem" }}>
          {JSON.stringify(value, null, 2)}
        </pre>
      ),
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
      render: (text) => new Date(text).toLocaleString(),
    },
  ];

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Auditoría de Actividades</h2>
      <Table columns={columns} dataSource={audits} loading={loading} rowKey="_id" />
    </div>
  );
};

export default AuditsPage;