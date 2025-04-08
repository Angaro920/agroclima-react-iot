import { useState, useEffect } from "react";
import { AreaChartComponent, BarChartComponent, LineChartComponent } from "../../components";
import { CollectionNameType } from "../../types";
import { BACKEND_URL } from "../../constants/urls";
import { ChartType } from "../../types/ChartType";

interface Props {
  parameter: CollectionNameType;
  tipo: ChartType
}
interface MongoObject {
  _id: string;
  promedio: string;
  
}

export const FetchDay = ({ tipo, parameter }: Props) => {
  const [promedio, setPromedio] = useState<MongoObject[]>([]);
  const URL = BACKEND_URL+`/api/listDay/${parameter}`;
 
   useEffect(() => {
     fetch(URL)
       .then((response) => response.json())
       .then((data) => setPromedio(data));
   }, []);
  if (tipo === "line"){
  return (
    <div>
      <LineChartComponent data={promedio} />
    </div>
  );}
  if (tipo === "bar"){
    return (
      <div>
        <BarChartComponent data={promedio}/>
      </div>
    );
  }
  if (tipo === "area"){
    return (
      <div>
        <AreaChartComponent data={promedio}/>
      </div>
    );
  }
};
