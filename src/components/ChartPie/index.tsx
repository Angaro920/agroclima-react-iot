import { Chart } from "@antv/g2";
import { useEffect, useRef } from "react";

interface ChartComponentProps {
  data: number | undefined;
}
/*ESTE CHART AUN NO FUNCIONA*/ 
export const PieChartComponent = ({ data }: ChartComponentProps) => {
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
      .transform({type:'stackY'})
      .data(data)
      .encode('y','value')
      .style('stroke','white')
      .scale('color',{palette: 'spectral',
        offset: (t) => t * 0.8 + 0.1,})
        .label({
            text: 'name',
            radius: 0.8,
            fontSize: 10,
            fontWeight: 'bold',
          })
          chart.render()
          chartRef.current = chart;
        }
        return () => {
          chartRef.current?.destroy();
        };
      }
  , [data]);
  return <div ref={chartContainerRef} style={{ height: 400 }} />;
}