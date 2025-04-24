import {Chart} from "@antv/g2"  
import { useEffect, useRef } from "react";
interface ChartComponentProps {
    data: number | undefined;
  }
export const BulletChartComponent = ({ data }: ChartComponentProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const dataBullet = [
    {
      title: 'Uv',
      Rango: 14,
      Medida: data,
      target: 14,
    },
  ];
  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = new Chart({
        container: chartContainerRef.current,
        autoFit: true,
      });
      chart.coordinate({ transform: [{ type: 'transpose' }] });
      chart.data(dataBullet);
      chart
      .interval()
      .encode('x', 'title')
      .encode('y', 'Rango')
      .encode('color', '#f0efff')
      .style('maxWidth', 30)
      .axis({
        y: {
          grid: true,
          gridLineWidth: 2,
        },
        x: {
          title: false,
        },
      });
    
    chart
      .interval()
      .encode('x', 'title')
      .encode('y', 'Medida')
      .encode('color', '#64DD17')
      .style('maxWidth', 20)
      .label({
        text: 'Medida',
        position: 'right',
        textAlign: 'left',
        dx: 5,
      });
    
    chart
      .point()
      .encode('x', 'title')
      .encode('y', 'target')
      .encode('shape', 'line')
      .encode('color', '#3D76DD')
      .encode('size', 8);
    
    chart.render();
      chartRef.current = chart;
    }
    return () => {
      chartRef.current?.destroy();
    }
  }, [data]);

  return <div ref={chartContainerRef} style={{ height: 400 }} />;
};