import { Button, Col, Popconfirm, Row, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { UserType } from "../../types";
import { ColumnsType } from "antd/es/table";

interface UsersTableProps {
  users: UserType[];
  loading: boolean;
  onPressDelete: (id: string) => void;
}

interface ColorByTag {
  [key: string]: string;
}

const COLOR_BY_TAG: ColorByTag = {
  estudiante: "cyan",
  soporte: "gold",
  docente: "green",
  administrador: "red",
  administrativo: "purple",
};


export const UsersTable = ({ users, loading, onPressDelete }: UsersTableProps) => {
  const mappedUsers : Partial <UserType>[] = users.map((user) => ({
    
    key: user._id || "",
    name: user.name,
    lastName: user.lastName,
    age: user.age,
    grado : user.grade,
    tag: user.tag,
  }));

  const columns : ColumnsType<Partial<UserType>>  = [
    {
      title: "Tipo",
      width: 200,
      key: "tag",
      dataIndex: "tag",
      render: (_, user  ) => (
        <>
          <Tag color={COLOR_BY_TAG[user.tag || ""]} key={user.tag}>
            {user.tag?.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Apellido",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Edad",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Grado",
      dataIndex: "grado",
      key: "grado",
    },

    {
      title: "Accion",
      width: 330,
      key: "action",
      render: (record: { key: string }) => (
        <>
          <Row>
            <Col span={4} style={{ margin: "auto" }}>
              <Button variant="outlined" color="green" icon={<EditOutlined />}>
                Editar
              </Button>
            </Col>
            <Col span={4} style={{ margin: "auto" }}>
              <Popconfirm
                title="¿Estás seguro de eliminar este usuario? "
                onConfirm={() => {
                  onPressDelete(record.key);
                }}
                okText="Sí"
                cancelText="No"
              >
                <Button
                  variant="outlined"
                  color="danger"
                  icon={<DeleteOutlined />}
                >
                  Eliminar
                </Button>
              </Popconfirm>
            </Col>
            <Col span={4}></Col>
          </Row>
        </>
      ),
    },
  ];

  type PartialUser = Partial<UserType>;

  return (
    <Table <PartialUser>
      columns={columns}
      dataSource={mappedUsers}
      loading={loading}
      style={{ height: "auto" }}
    />
  );
};
