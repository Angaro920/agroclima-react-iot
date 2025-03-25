import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import { dashboardStyle } from "../../styles";
import useGetData from "../../hooks/useGetData";


export const ReportRain = () => {
  const {weather, loading, getRain} = useGetData();
    
    useEffect(() => {
      getRain();
    }, []);
  return (
    <div style={dashboardStyle.mainSector}>
      <ReportTable title="Precipitaciones"loading={loading} weather={weather} sufijo="in" />
    </div>
  );
};
