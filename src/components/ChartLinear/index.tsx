import { Chart } from '@antv/g2';
import { useEffect, useRef } from 'react';
import { MongoObject } from '../../constants/MongoObject';

interface ChartComponentProps {
  data: MongoObject[];
}

export const LineChartComponent = ({ data}: ChartComponentProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null);

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

      chartRef.current = chart; 
    }

    return () => {
      chartRef.current?.destroy(); 
    };
  }, [data]);

  return <div ref={chartContainerRef} style={{ height: 400 }} />;
}