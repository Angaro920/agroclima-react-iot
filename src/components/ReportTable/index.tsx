import { Table  } from "antd";
import { FC } from "react";
import { DataType } from "../../types";

import { es } from 'date-fns/locale'
import { formatInTimeZone } from 'date-fns-tz'

es.code= 'es-CO'

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
  {
    title: "Fecha",
    dataIndex: "time",
    render: (time: string) => formatInTimeZone(time, 'America/Bogota',  'dd MMMM yyyy  HH:mm:ss', { locale: es }),
  },
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
  

 
  return (
    <>
      <h1>Historico de {title} </h1>
      <div>
        <Table<DataType>
          columns={columns}
          dataSource={mappedData as DataType[]}
          loading={loading}
          style={{ height: "auto" }}
        />
      </div>
    </>
  );
};
