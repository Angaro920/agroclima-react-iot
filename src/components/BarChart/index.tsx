import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { MongoObject } from "../../contexts/DataContext";
interface LineChartComponentProps {
  data: MongoObject[];
  nombre: string
}

export const BarChartComponent = ({ data, nombre }: LineChartComponentProps) => {
  return (
      <BarChart
      title="Promedio del mes"
        width={800}
        height={200}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
        
          name={nombre}
          dataKey="promedio"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
  );
};
