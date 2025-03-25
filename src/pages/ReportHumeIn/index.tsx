import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import { dashboardStyle } from "../../styles";
import useGetData from "../../hooks/useGetData";


export const ReportHumIn = () => {
  const {weather, loading, getHumeIn} = useGetData();
    
    useEffect(() => {
      getHumeIn();
    }, []);
  return (
    <div style={dashboardStyle.mainSector}>
      <ReportTable title="Humedad Interna"loading={loading} weather={weather} sufijo="%" />
    </div>
  );
};
