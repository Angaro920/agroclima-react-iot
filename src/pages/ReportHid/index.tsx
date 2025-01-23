import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import { dashboardStyle } from "../../styles";
import useGetData from "../../hooks/useGetData";


export const ReportHidPage = () => {
  const {weather, loading, getGas} = useGetData();
    
    useEffect(() => {
      getGas();
    }, []);
  return (
    <div style={dashboardStyle.mainSector}>
      <ReportTable title="Gas"loading={loading} weather={weather} sufijo="PPP" />
    </div>
  );
};
