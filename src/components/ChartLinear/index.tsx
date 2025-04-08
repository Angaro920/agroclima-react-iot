/* import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { MongoObject } from "../../constants/MongoObject.ts";

interface LineChartComponentProps {
  data: MongoObject[];
  nombre: string;
}

export const LineChartComponent = ({ data, nombre}: LineChartComponentProps) => {
  console.log("Llegue al componente:"+JSON.stringify(data)) 
  return (
      <LineChart
        width={800}
        height={200}
        data={data}
        margin={{
          top: 20,
          right: 70,
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
 */
import { Chart } from '@antv/g2';
import { useEffect, useRef } from 'react';
import { MongoObject } from '../../constants/MongoObject';

interface LineChartComponentProps {
  data: MongoObject[];
  nombre: string;
}

export const LineChartComponent = ({ data}: LineChartComponentProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null); // 👉 guardamos el Chart también

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = new Chart({
        container: chartContainerRef.current,
        autoFit: true,
      });

      chart
        .line()
        .data(data)
        .encode('x', '_id')
        .encode('y', 'promedio')
        .style({stroke:'skyblue', lineWidth: 2, opacity: 0.5});
        

      chart.render();

      chartRef.current = chart; // guardamos referencia
    }

    return () => {
      chartRef.current?.destroy(); // ✅ destruimos el chart cuando se desmonte
    };
  }, [data]); // 👉 se vuelve a correr si data cambia

  return <div ref={chartContainerRef} style={{ height: 400 }} />;
}