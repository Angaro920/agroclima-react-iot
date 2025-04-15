import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import { dashboardStyle } from "../../styles";
import useGetData from "../../hooks/useGetData";



export const ReportDirViento = () => {
  const {weather, loading, getDirViento} = useGetData();
    
    useEffect(() => {
      getDirViento();
    }, []);
  return (
    <div style={dashboardStyle.mainSector}>
      <ReportTable title="Direccion del Viento"loading={loading} weather={weather} sufijo="°" />
    </div>
  );
};
