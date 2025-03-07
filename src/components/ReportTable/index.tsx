import { Table, Button } from "antd";
import { FC } from "react";
import { DataType } from "../../types";

interface DataTableProps {
  title: string;
  weather: DataType[];
  loading: boolean;
  sufijo: string;
}

const columns = [
  {
    title: "Registro",
    dataIndex: "data",
    width: 150,
  },
  { title: "Fecha", dataIndex: "time" },
];

export const ReportTable: FC<DataTableProps> = ({
  title,
  weather,
  loading,
  sufijo,
}) => {
  const mappedData: Partial<DataType>[] = weather.map((item) => ({
    key: item._id || "",
    _id: item._id,
    data: item.data + " " + sufijo,
    time: item.time,
  }));

  return (
    <>
      <h1>Reporte de {title} </h1>
      <div>
        <div style={{ marginBottom: 10 }}>
          <Button>Generar Reporte</Button>
        </div>
        <Table<DataType>
          columns={columns}
          dataSource={mappedData as DataType[]}
          loading={loading}
          style={{ height: "auto" }}
        />
      </div>
    </>
  );
};
