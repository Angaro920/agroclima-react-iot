import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import useGetData from "../../hooks/useGetData";
import { dashboardStyle } from "../../styles";

export const ReportLightPage = () => {
  const {weather, loading, getLuz} = useGetData();
      
      useEffect(() => {
        getLuz();
      }, []);
  return (
    <div style={dashboardStyle.mainSector}>
        <ReportTable title="Luz" weather={weather} loading={loading} sufijo="%" />
    </div>
  );
};
