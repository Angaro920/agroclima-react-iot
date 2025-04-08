import {Chart} from "@antv/g2"
import { MongoObject } from "../../constants/MongoObject";
import { useEffect, useRef } from "react";
interface LineChartComponentProps {
  data: MongoObject[]; 
  nombre: string
}
export const BarChartComponent = ({ data }: LineChartComponentProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null);
  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = new Chart({
        container: chartContainerRef.current,
        autoFit: true,
      });

      chart
        .interval()
        .data(data)
        .encode('x', '_id')
        .encode('y', 'promedio')
        .style({fill: 'grey'})

      chart.render();
      chartRef.current = chart;
    }
    return () => {
      chartRef.current?.destroy(); // ✅ destruimos el chart cuando se desmonte
    }
  }, [data]);

  return <div ref={chartContainerRef} style={{ height: 400 }} />;
};