import { Key } from "react";
import { Button, Col, Row, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

interface DataType {
  key: Key;
  name: string;
  age: number;
  grado: string;
  tags: string[];
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Grado",
    dataIndex: "grado",
    key: "grado",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag;
          if (tag === "student") {
            color = "cyan";
          } else if (tag === "developer") {
            color = "gold";
          } else if (tag === "teacher") {
            color = "green";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Accion",
    key: "action",
    render: () => (
      <>
        <Row>
          <Col span={4}>
            <Button variant="outlined" color="green" icon={<EditOutlined />}>
              Editar
            </Button>
          </Col>
          <Col span={4}>
            <Button variant="outlined" color="danger" icon={<DeleteOutlined />}>
              Eliminar
            </Button>
          </Col>
          <Col span={4}>
            <Button variant="outlined" color="cyan" icon={<EyeOutlined />}>
              Examinar
            </Button>
          </Col>
        </Row>
      </>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    grado: "N/A",
    tags: ["developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    grado: "Octavo",
    tags: ["student"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    grado: "Once",
    tags: ["teacher"],
  },
];

export const UsersTable = () => {
  return (
    <Table<DataType>
      columns={columns}
      dataSource={data}
      /* pagination={{ pageSize: 100 }} */
      style={{ height: "auto" }}
      /* scroll={{ y: 150 * 5 }} */
    />
  );
};
