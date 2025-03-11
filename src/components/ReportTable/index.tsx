import { Table, Button } from "antd";
import { FC, useState } from "react";
import { DataType } from "../../types";
import Modal from "antd/es/modal/Modal";
import { FormReport } from "../FormReport";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <h1>Reporte de {title} </h1>
      <div>
        <div style={{ marginBottom: 10 }}>
          <Button onClick={showModal}>Generar Reporte</Button>
        </div>
        <Table<DataType>
          columns={columns}
          dataSource={mappedData as DataType[]}
          loading={loading}
          style={{ height: "auto" }}
        />
      </div>

      <Modal title="Generar Reporte" open={isModalOpen} onOk={handleCancel} onCancel={handleCancel}>
        <FormReport/>
      </Modal>
    </>
  );
};
