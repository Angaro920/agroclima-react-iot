import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { createStyles } from "antd-style";
import { dashboardStyle } from "../../styles";

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

interface DataType {
  key: React.Key;
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
];

const dataSource = Array.from({ length: 100 }).map<DataType>((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));

export const ReportHidPage = () => {
  const { styles } = useStyle();
  return (
    <div style={dashboardStyle.mainSector}>
      <h1>Reporte de Gases</h1>
      <div>
        <Table<DataType>
          className={styles.customTable}
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 100 }}
          scroll={{ y: 55 * 5 }}
        />
      </div>
    </div>
  );
};
