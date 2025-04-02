import { useState, useEffect } from "react";
import { LineChartComponent } from "../../components";
import { CollectionNameType } from "../../types";

interface Props {
  parameter: CollectionNameType;
}
interface MongoObject {
  _id: string;
  promedio: string;
}

export const FetchDay = ({ parameter }: Props) => {
  const [promedio, setPromedio] = useState<MongoObject[]>([]);

  const URL = `http://localhost:8000/api/listDay/${parameter}`;

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setPromedio(data));
  }, []);

  return (
    <div>
      <LineChartComponent data={promedio} nombre={parameter} />
    </div>
  );
};
