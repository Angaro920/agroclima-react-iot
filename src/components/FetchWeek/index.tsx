/* import { useState, useEffect } from "react";
import { AreaChartComponent } from "../../components";
import { CollectionNameType } from "../../types";

interface Props {
  parameter: CollectionNameType
}
interface MongoObject {
  _id: string;
  promedio: string;
}

export const FetchWeek = ({ parameter }: Props) => {
  const [promedio, setPromedio] = useState<MongoObject[]>([]);

  const URL = `http://localhost:8000/api/listWeek/${parameter}`;

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
 */