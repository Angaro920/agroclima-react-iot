import { Button, Input, InputRef, Space, Table, TableColumnType } from "antd";
import { FC, useRef, useState } from "react";
import { DataType } from "../../types";
import { es } from "date-fns/locale";
import { ColumnsType, FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

es.code = "es-CO";

interface DataTableProps {
  title: string;
  weather: DataType[];
  loading: boolean;
  sufijo: string;
}

type DataIndex = keyof DataType;


export const ReportTable: FC<DataTableProps> = ({
  title,
  weather,
  loading,
  sufijo,
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
  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<Partial<DataType>> => ({
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

  const mappedData: Partial<DataType>[] = weather.map((item) => ({
    key: item._id || "",
    _id: item._id,
    Promedio: item.Promedio,
    Fecha: item.Fecha,
  }));

  const columns : ColumnsType<Partial<DataType>> = [
  {
    title: "Registro",
    dataIndex: "Promedio",
    width: 300,
    sorter: (a, b) => (a.Promedio ?? 0) - (b.Promedio ?? 0),
    render: (value) => `${value} ${sufijo}` 
  },
  {
    title: "Fecha",
    dataIndex: "Fecha",
    ...getColumnSearchProps("Fecha"),
  },
];


  return (
    <>
      <h1>Historico de {title} </h1>
      <div>
        <Table<Partial<DataType>>
          columns={columns}
          dataSource={mappedData}
          loading={loading}
          style={{ height: "auto" }}
        />
      </div>
    </>
  );
};
