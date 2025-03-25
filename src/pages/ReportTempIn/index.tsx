import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import { dashboardStyle } from "../../styles";
import useGetData from "../../hooks/useGetData";


export const ReportTempIn = () => {
  const {weather, loading, getTempIn} = useGetData();
    
    useEffect(() => {
      getTempIn();
    }, []);
  return (
    <div style={dashboardStyle.mainSector}>
      <ReportTable title="Temperatura Interna"loading={loading} weather={weather} sufijo="C°" />
    </div>
  );
};
