import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import { dashboardStyle } from "../../styles";
import useGetData from "../../hooks/useGetData";


export const ReportTempOut = () => {
  const {weather, loading, getTempOut} = useGetData();
    
    useEffect(() => {
      getTempOut();
    }, []);
  return (
    <div style={dashboardStyle.mainSector}>
      <ReportTable title="Temperatura Externa"loading={loading} weather={weather} sufijo="C°" />
    </div>
  );
};
