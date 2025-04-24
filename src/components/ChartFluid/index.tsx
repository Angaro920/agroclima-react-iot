import { Chart } from "@antv/g2";
import { useEffect, useRef } from "react";

interface ChartComponentProps {
    data: number | undefined;
  }

export const FluidChartComponent = ({ data }: ChartComponentProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = new Chart({
        container: chartContainerRef.current,
        autoFit: true,
      });

      chart.liquid().data(data ? data/100 : 0).style({
        shape: "circle",
        contentFill: "black",
        contentText: data +"mm",
        outlineBorder: 4,
        outlineDistance: 8,
        waveLength: 128,
      });
      chart.render();
      chartRef.current = chart;
    }
    return () => {
        chartRef.current?.destroy();
      };
  }, [data]);
  return <div ref={chartContainerRef} style={{ height: 400 }} />;
};
