import { useState, useEffect } from "react";
import { AreaChartComponent} from "../../components";

interface Props {
  frequency: "listDay" | "listWeek" | "listMonth";
  parameter: "Temperatura" | "Humedad" | "Hidrogeno" | "Luz";
}
interface MongoObject {
  _id: string;
  promedio: string;
}

export const FetchWeek = ({ frequency, parameter }: Props) => {
  const [promedio, setPromedio] = useState<MongoObject[]>([]);

  const URL = `http://localhost:8000/api/${frequency}/${parameter}`;

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setPromedio(data));
  }, []);

  return (
    <div>
      <AreaChartComponent data={promedio} nombre={parameter} />
    </div>
  );
};
