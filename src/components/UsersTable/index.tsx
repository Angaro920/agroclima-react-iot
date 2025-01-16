import { useEffect, useState } from "react";
import { Button, Col, Row, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface DataType {
  key: string;
  name: string;
  age: number;
  grado: string;
  tags: string[];
}

const columns = [
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
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (_: any, { tags }: any) => (
      <>
        {tags.map((tag: string) => {
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
    width: 330,
    key: "action",
    render: () => (
      <>
        <Row>
          <Col span={4} style={{ margin: "auto" }}>
            <Button variant="outlined" color="green" icon={<EditOutlined />}>
              Editar
            </Button>
          </Col>
          <Col span={4} style={{ margin: "auto" }}>
            <Button variant="outlined" color="danger" icon={<DeleteOutlined />}>
              Eliminar
            </Button>
          </Col>
          <Col span={4}>
          </Col>
        </Row>
      </>
    ),
  },
];

export const UsersTable = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/listUsers") 
      .then((response) => response.json())
      .then((data) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formattedData = data.map((item: any) => ({
          key: item._id,
          name: item.name,
          age: parseInt(item.age, 10),
          grado: item.grade,
          tags: [item.tag],
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
    <Table<DataType>
      columns={columns}
      dataSource={data}
      loading={loading}
      style={{ height: "auto" }}
    />
  );
};
