import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import { dashboardStyle } from "../../styles";
import useGetData from "../../hooks/useGetData";


export const ReportSolarRad = () => {
  const {weather, loading, getSolarRad} = useGetData();
    
    useEffect(() => {
     getSolarRad();
    }, []);
  return (
    <div style={dashboardStyle.mainSector}>
      <ReportTable title="Radiacion Solar"loading={loading} weather={weather} sufijo="W/m²" />
    </div>
  );
};
