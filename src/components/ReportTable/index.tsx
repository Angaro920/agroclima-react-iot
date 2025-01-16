import { Table } from "antd";
import { useEffect, useState } from "react";

interface DataType {
  key: string;
  temperatura: number;
  date: string;
}

const columns = [
  {
    title: "Registro",
    dataIndex: "temperatura",
    width: 150,
  },
  { title: "Date", dataIndex: "timestamp" },
];

export const ReportTable = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/listData")
      .then((response) => response.json())
      .then((data) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formattedData = data.map((item: any) => ({
          key: item._id,
          temperatura: item.temperatura,
          timestamp: item.timestamp,
        }));
        setData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <h1>Reporte de </h1>
      <div>
        <Table<DataType>
          columns={columns}
          dataSource={data}
          loading={loading}
          style={{ height: "auto" }}
        />
      </div>
    </>
  );
};
