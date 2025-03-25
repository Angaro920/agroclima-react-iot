import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import { dashboardStyle } from "../../styles";
import useGetData from "../../hooks/useGetData";


export const ReportBaromRel = () => {
  const {weather, loading, getBaromRel} = useGetData();
    
    useEffect(() => {
      getBaromRel();
    }, []);
  return (
    <div style={dashboardStyle.mainSector}>
      <ReportTable title="Presion Atmosferica Relativa"loading={loading} weather={weather} sufijo="in/gh" />
    </div>
  );
};
