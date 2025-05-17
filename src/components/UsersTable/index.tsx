import { FC, useState, useRef } from "react";
import {
  Button,
  Col,
  Input,
  InputRef,
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
import Highlighter from "react-highlight-words";
import { FilterDropdownProps } from "antd/es/table/interface";

interface UsersTableProps {
  users: UserType[];
  loading: boolean;
  onPressDelete: (id: string) => void;
  onPressUpdate: (id: string) => void; // Ahora solo recibe el ID
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

type DataIndex = keyof UserType;

export const UsersTable: FC<UsersTableProps> = ({
  users,
  loading,
  onPressDelete,
  onPressUpdate,
}) => {
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

  const mappedUsers: Partial<UserType>[] = users.map((user) => ({
    key: user._id || "",
    id: user.id,
    name: user.name,
    email: user.email,
    documento: user.documento,
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
          placeholder={`Buscar ${dataIndex}`}
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
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reiniciar
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
      title: "Documento Identidad",
      dataIndex: "documento",
      key: "documento",
      ...getColumnSearchProps("documento"),
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
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
      title: "Correo",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
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
          onClick={() => onPressUpdate(record.id as string)} // 🔁 actualizado
        >
          Editar
        </Button>
      </Col>
      <Col span={4} style={{ margin: "auto" }}>
        <Popconfirm
          title="¿Estás seguro de eliminar este usuario?"
          onConfirm={() => {
            onPressDelete(record.id as string); // 🔁 actualizado
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
    <Table<Partial<UserType>>
      columns={columns}
      dataSource={mappedUsers}
      loading={loading}
      style={{ height: "auto" }}
    />
  );
};