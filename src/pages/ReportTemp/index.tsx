import { dashboardStyle } from "../../styles";
import { ReportTable } from "../../components/ReportTable";
import useGetData from "../../hooks/useGetData";
import { useEffect } from "react";


export const ReportTempPage = () => {
  const {weather, loading, getTemperatura} = useGetData();
  
  useEffect(() => {
    getTemperatura();
  }, []);

  return (
    <div style={dashboardStyle.mainSector}>
      <div>
        <ReportTable title="Temperatura" weather={weather} loading={loading} sufijo="°C"/>
      </div>
    </div>
  );
};
