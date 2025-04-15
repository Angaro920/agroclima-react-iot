import { useState, useEffect } from "react";
import { AreaStakedChartComponent } from "../../components";
import { CollectionNameType } from "../../types";
import { BACKEND_URL } from "../../constants/urls";

interface Props {
  parameter: CollectionNameType;
  parameter2: CollectionNameType;
}
interface MongoObject {
  _id: string;
  promedio: string;
  
}

export const FetchDualDay = ({ parameter, parameter2 }: Props) => {
  const [value, setValue] = useState<MongoObject[]>([]);
  const URL = BACKEND_URL+`/api/listDualDay/${parameter}/${parameter2}`;
 
   useEffect(() => {
     fetch(URL)
       .then((response) => response.json())
       .then((data) => setValue(data));
   }, []);
  return (
    <div>
        <AreaStakedChartComponent data={value} />
    </div>
  )
};
