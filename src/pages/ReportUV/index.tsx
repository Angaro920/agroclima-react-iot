import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import { dashboardStyle } from "../../styles";
import useGetData from "../../hooks/useGetData";


export const ReportUV = () => {
  const {weather, loading, getUv} = useGetData();
    
    useEffect(() => {
      getUv();
    }, []);
  return (
    <div style={dashboardStyle.mainSector}>
      <ReportTable title="UV"loading={loading} weather={weather} sufijo="mj/cm²" />
    </div>
  );
};
