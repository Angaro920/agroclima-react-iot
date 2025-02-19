import { FC, useState, useRef } from "react";
import {
  Button,
  Col,
  Input,
  InputRef,
  Modal,
  Popconfirm,
  Row,
  Space,
  Table,
  TableColumnType,
  Tag,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { UserType } from "../../types";
import { ColumnsType } from "antd/es/table";
import { FormUser } from "../FormUser";
import Highlighter from "react-highlight-words";
import { FilterDropdownProps } from "antd/es/table/interface";

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
  confirmPassword: "",
  name: "",
  lastName: "",
  age: 0,
  grade: "",
  type: "",
  tag: "",
};

type DataIndex = keyof UserType;

export const UsersTable: FC<UsersTableProps> = ({
  users,
  loading,
  onPressDelete,
  onPressUpdate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<UserType>(INITIAL_FORM);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };
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

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<Partial<UserType>> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="dashed"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Cerrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        ?.toLowerCase()
        ?.includes((value as string).toLowerCase()) ?? false,
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text?: string | number) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns: ColumnsType<Partial<UserType>> = [
    {
      title: "Tipo",
      width: 200,
      key: "tag",
      dataIndex: "tag",
      filters: [
        { text: "Soporte", value: "soporte" },
        { text: "Administrador", value: "administrador" },
        { text: "Estudiante", value: "estudiante" },
        { text: "Docente", value: "docente" },
      ],
      onFilter: (value, record) => record.tag?.indexOf(value as string) === 0,
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
      ...getColumnSearchProps("name"),
    },
    {
      title: "Apellido",
      dataIndex: "lastName",
      key: "lastName",
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "Edad",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => (a.age ?? 0) - (b.age ?? 0),
    },
    {
      title: "Grado",
      dataIndex: "grade",
      key: "grade",
      filters: [
        { text: "Primero", value: "Primero" },
        { text: "Segundo", value: "Segundo" },
        { text: "Tercero", value: "Tercero" },
        { text: "Cuarto", value: "Cuarto" },
        { text: "Quinto", value: "Quinto" },
        { text: "Sexto", value: "Sexto" },
        { text: "Septimo", value: "Septimo" },
        { text: "Octavo", value: "Octavo" },
        { text: "Noveno", value: "Noveno" },
        { text: "Decimo", value: "Decimo" },
        { text: "Once", value: "Once" },
        { text: "No aplica", value: "No aplica" },
      ],
      onFilter: (value, record) => record.grade?.indexOf(value as string) === 0,
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
            onClick={() => onPressUpdate(selectedUserId as string, formData)}
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
        /* onChange={onChange} */
      />
    </>
  );
};
