import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MongoObject } from "../../contexts/DataContext";
/* import { graph } from './linearstyle.tsx'; */

interface LineChartComponentProps {
  data: MongoObject[];
}

export const LineChartComponent = ({data}: LineChartComponentProps) => {
 /*  console.log("Llegue al componente:"+JSON.stringify(data)) */
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis domain={['auto', 'auto']} interval="preserveStartEnd" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="data" stroke="#82ca9d" dot={false}/>
      </LineChart>
    </ResponsiveContainer>
  );
};
