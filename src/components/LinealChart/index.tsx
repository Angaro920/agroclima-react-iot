import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { MongoObject } from "../../contexts/DataContext";
/* import { graph } from './linearstyle.tsx'; */

interface LineChartComponentProps {
  data: MongoObject[];
  nombre: string;
}

export const LineChartComponent = ({data, nombre}: LineChartComponentProps) => {
  console.log("Llegue al componente:"+JSON.stringify(data))
  return (
      <LineChart
        width={800}
        height={200}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis domain={['auto', 'auto']} interval="preserveStartEnd" />
        <Tooltip />
        <Legend />
        <Line name={nombre} type="monotone" dataKey="promedio" stroke="#82ca9d" dot={true}/>
      </LineChart>
  );
};
