/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";


interface ComposedComponentProps {
  data: any;
}

export const ComposedChartComponent = ({ data }: ComposedComponentProps) => {
  const formatData = (jsonData: any) => {
    const formattedData = jsonData.Temperatura.map((temp: any, index: any) => ({
      name: `Page ${String.fromCharCode(65 + index)}`,
      Temperatura: temp.data,
      Humedad: jsonData.Humedad[index]?.data,
      Gas: jsonData.Gas[index]?.data,
      Luz: jsonData.Luz[index]?.data,
    }));
    return formattedData;
  };
  const formattedData = formatData(data);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={500}
        height={400}
        data={formattedData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <YAxis domain={['auto', 'auto']} interval="preserveStartEnd"/>
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="Temperatura" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="Gas" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="Humedad" stroke="#ff7300" />
        <Scatter dataKey="Luz" fill="red" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
