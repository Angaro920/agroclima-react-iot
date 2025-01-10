import { Key } from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";

interface DataType {
  key: Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    width: 150,
  },
  {
    title: "Age",
    dataIndex: "age",
    width: 150,
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  { title: "Date", dataIndex: "date" },
];
const date = new Date();
const dataSource = Array.from({ length: 100 }).map<DataType>((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 1 + i,
  address: `London, Park Lane no. ${i}`,
  date: date.toISOString(),
}));

export const ReportTable = () => {
  return (
      <><h1>Reporte de </h1><div>
          <Table<DataType>
              columns={columns}
              dataSource={dataSource}
              /* pagination={{ pageSize: 100 }} */
              style={{ height: "auto" }} />
      </div></>
  );
};
