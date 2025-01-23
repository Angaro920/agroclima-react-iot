import  { FC,useState } from "react";
import { Button, Col, Modal, Popconfirm, Row, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { UserType } from "../../types";
import { ColumnsType } from "antd/es/table";
import { FormUser } from "../FormUser";

interface UsersTableProps {
  users: UserType[];
  loading: boolean;
  onPressDelete: (id: string) => void;
  onPressUpdate: (id: string, data: UserType) => void;
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

const INITIAL_FORM: UserType = {
  userName: "",
  password: "",
  name: "",
  lastName: "",
  age: 0,
  grade: "",
  type: "",
  tag: "",
};

export const UsersTable: FC<UsersTableProps> = ({
  users,
  loading,
  onPressDelete,
  onPressUpdate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<UserType>(INITIAL_FORM);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const showModal = (userId: string, userData: UserType) => {
    setSelectedUserId(userId);
    setFormData(userData);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
    setFormData(INITIAL_FORM);
  };

    const mappedUsers: Partial<UserType>[] = users.map((user) => ({
      key: user._id || "",
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      age: user.age,
      grade: user.grade,
      tag: user.tag,
    }));

    const columns: ColumnsType<Partial<UserType>> = [
      {
        title: "Tipo",
        width: 200,
        key: "tag",
        dataIndex: "tag",
        render: (_, user) => (
          <Tag color={COLOR_BY_TAG[user.tag || ""]} key={user.tag}>
            {user.tag?.toUpperCase()}
          </Tag>
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
        dataIndex: "grade",
        key: "grade",
      },
      {
        title: "Acción",
        width: 330,
        key: "action",
        render: (record: Partial<UserType>) => (
          <Row>
            <Col span={4} style={{ margin: "auto" }}>
              <Button
                variant="outlined"
                color="green"
                icon={<EditOutlined />}
                onClick={() =>
                  showModal(record._id as string, record as UserType)
                }
              >
                Editar
              </Button>
            </Col>
            <Col span={4} style={{ margin: "auto" }}>
              <Popconfirm
                title="¿Estás seguro de eliminar este usuario?"
                onConfirm={() => {
                  onPressDelete(record._id as string);
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
          </Row>
        ),
      },
    ];

    return (
      <>
        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[
            <Button
              key="enviar"
              variant="solid"
              onClick={()=> onPressUpdate(selectedUserId as string,formData)}
              loading={loading}
              htmlType="submit"
              color="green"
            >
              Editar
            </Button>,
            <Button key="cancelar" onClick={handleCancel}>
              Cancelar
            </Button>,
          ]}
        >
          <FormUser formData={formData} setFormData={setFormData}></FormUser>
        </Modal>
        <Table<Partial<UserType>>
          columns={columns}
          dataSource={mappedUsers}
          loading={loading}
          style={{ height: "auto" }}
        />
      </>
    );
  };
