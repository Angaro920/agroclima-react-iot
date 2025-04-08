/* import { useState, useEffect } from "react";
import { BarChartComponent } from "../../components";
import { CollectionNameType } from "../../types";

interface Props {
  parameter: CollectionNameType;
}
interface MongoObject {
  _id: string;
  promedio: string;
}

export const FetchMonth = ({ parameter }: Props) => {
  const [promedio, setPromedio] = useState<MongoObject[]>([]);

  const URL = `http://localhost:8000/api/listMonth/${parameter}`;

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setPromedio(data));
  }, []);

  return (
    <div>
      <BarChartComponent data={promedio} nombre={parameter} />
    </div>
  );
};
 */