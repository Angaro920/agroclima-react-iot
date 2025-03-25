import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import { dashboardStyle } from "../../styles";
import useGetData from "../../hooks/useGetData";


export const ReportHumOut = () => {
  const {weather, loading, getHumeOut} = useGetData();
    
    useEffect(() => {
      getHumeOut();
    }, []);
  return (
    <div style={dashboardStyle.mainSector}>
      <ReportTable title="Humedad Exterior"loading={loading} weather={weather} sufijo="%" />
    </div>
  );
};
