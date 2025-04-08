import { useState, useEffect } from "react";
import { BarChartComponent } from "../../components";
import { CollectionNameType } from "../../types";
import { BACKEND_URL } from "../../constants/urls";

interface Props {
  parameter: CollectionNameType;
}
interface MongoObject {
  _id: string;
  promedio: string;
}

export const FetchMonth = ({ parameter }: Props) => {
  const [promedio, setPromedio] = useState<MongoObject[]>([]);

  const URL = BACKEND_URL+`/api/listMonth/${parameter}`;

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setPromedio(data));
  }, []);

  return (
    <div>
      <BarChartComponent data={promedio} />
    </div>
  );
};
