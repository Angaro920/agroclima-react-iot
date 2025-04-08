import { Chart } from '@antv/g2';
import { useEffect, useRef } from 'react';
import { MongoObject } from '../../constants/MongoObject';

interface LineChartComponentProps {
  data: MongoObject[];
  nombre: string;
}

export const AreaChartComponent = ({ data }: LineChartComponentProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null); // 👉 guardamos el Chart también

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = new Chart({
        container: chartContainerRef.current,
        autoFit: true,
      });

      chart
        .area()
        .data(data)
        .encode('x', '_id')
        .encode('y', 'promedio')
        .style({fill: '#82ca9d', stroke: '#82ca9d'})

      chart.render();

      chartRef.current = chart; // guardamos referencia
    }

    return () => {
      chartRef.current?.destroy(); // ✅ destruimos el chart cuando se desmonte
    };
  }, [data]); // 👉 se vuelve a correr si data cambia

  return <div ref={chartContainerRef} style={{ height: 400 }} />;
};