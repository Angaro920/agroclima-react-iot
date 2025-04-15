import { Chart } from '@antv/g2';
import { useEffect, useRef } from 'react';
import { MongoObject } from '../../constants/MongoObject';

interface ChartComponentProps {
  data: MongoObject[];
}

export const AreaChartComponent = ({ data }: ChartComponentProps) => {
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
        .encode('x', 'fecha')
        .encode('y', 'promedio')
        .style({fill: '#82B1FF80', stroke: '#82ca9d'})
        .animate('enter', { type: 'pathIn', duration: 1000 });

      chart.render();

      chartRef.current = chart; // guardamos referencia
    }

    return () => {
      chartRef.current?.destroy(); // ✅ destruimos el chart cuando se desmonte
    };
  }, [data]); // 👉 se vuelve a correr si data cambia

  return <div ref={chartContainerRef} style={{ height: 400 }} />;
};