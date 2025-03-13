import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from "recharts";
import { MongoObject } from "../../contexts/DataContext";

interface LineChartComponentProps {
  data: MongoObject[];
  nombre: string;
}
export const AreaChartComponent = ({
  data,
  nombre,
}: LineChartComponentProps) => {
  return (
    
      <AreaChart
        width={800}
        height={200}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <XAxis dataKey="_id" name="Tiempo">
          <Label value={nombre} offset={0} position={"insideBottom"}/>
        </XAxis>
        <YAxis name="promedio" />
        <Tooltip />
        <Area
          name={nombre}
          type="monotone"
          dataKey="promedio"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
  );
};
