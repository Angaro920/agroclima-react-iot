import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
/* import { graph } from './linearstyle.tsx'; */
const data = [
  {
    Temperatura: 1000,
  },
  {
    name: "2 pm",
    Temperatura: 4000,
  },
  {
    name: "Page B",
    Temperatura: 3000,
  },
  {
    name: "Page C",
    Temperatura: 2000,
  }
];

export const LineChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line name="lavrga" type="monotone" dataKey="Temperatura" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};
