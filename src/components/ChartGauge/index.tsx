import { Chart } from "@antv/g2";
import { useEffect, useRef } from "react";

interface ChartComponentProps {
  data: number;
}

export const GaugeChartComponent = ({ data }: ChartComponentProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null);
useEffect(() => {
  if (chartContainerRef.current) {
    const chart = new Chart({
      container: chartContainerRef.current,
      autoFit: true,
    });

    chart
      .gauge()
      .data({
        value: {
          target: data,
          total: 1000,
          name: "data",
          thresholds: [800, 900, 1000],
        },
      })
      .scale("color", {
        range: ['#43A047', '#FDD835', '#E53935'],
      })
      .style("textContent", (target: string) => `Total:${target}%`)
      .style({
        arcShape: "round",
        arcLineWidth: 2,
        arcStroke: "#fff",
      })
      .legend(false);
    chart.render();

    chartRef.current = chart;
  }
  return () => {
    chartRef.current?.destroy(); 
  };}, [data]);
    return <div ref={chartContainerRef} style={{ height: 400 }} />;
};
