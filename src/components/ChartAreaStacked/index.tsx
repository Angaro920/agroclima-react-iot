import { Chart } from "@antv/g2";
import { useEffect, useRef } from "react";
import { MongoObject } from "../../constants/MongoObject";

interface ChartComponentProps {
  data: MongoObject[];
}
export const AreaStakedChartComponent = ({ data }: ChartComponentProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null); // 👉 guardamos el Chart también

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = new Chart({
        container: chartContainerRef.current,
        autoFit: true,
      });
      chart
        .data(data)
        .encode("x", "hora")
        .encode("y", "value")
        .encode("color", "lugar")
        .axis("x", { title: true })
        .axis("y", { title: true })
        .animate("enter", { type: "growInX" });

      chart.area().style("fillOpacity", 0.1).animate('enter', { type: 'growInX', duration: 2000 });

      chart.line().style("strokeWidth", 2).tooltip(false).animate('enter', { type: 'growInX', duration: 2000 });

      chart.render();
      chartRef.current = chart;
    }
    return () => {
      chartRef.current?.destroy();
    };
  }, [data]);
  return <div ref={chartContainerRef} style={{ height: 400 }} />;
};
