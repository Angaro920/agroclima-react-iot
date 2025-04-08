import { useState, useEffect } from "react";
import { AreaChartComponent, BarChartComponent, LineChartComponent } from "../../components";
import { CollectionNameType } from "../../types";
import { BACKEND_URL } from "../../constants/urls";

interface Props {
  parameter: CollectionNameType;
  tipo: string;
}
interface MongoObject {
  _id: string;
  promedio: string;
}

export const FetchDay = ({ tipo,parameter }: Props) => {
  const [promedio, setPromedio] = useState<MongoObject[]>([]);

  const URL = BACKEND_URL+`/api/listDay/${parameter}`;

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setPromedio(data));
  }, []);
  if (tipo === "linear"){
  return (
    <div>
      <LineChartComponent data={promedio} nombre={parameter} />
    </div>
  );}
  if (tipo === "bar"){
    return (
      <div>
        <BarChartComponent data={promedio} nombre={parameter} />
      </div>
    );
  }
  if (tipo === "area"){
    return (
      <div>
        <AreaChartComponent data={promedio} nombre={parameter} />
      </div>
    );
  }
};
