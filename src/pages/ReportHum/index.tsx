import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import { dashboardStyle } from "../../styles";
import useGetData from "../../hooks/useGetData";

export const ReportHumPage = () => {
  const { weather, loading, getHumedad } = useGetData();

  useEffect(() => {
    getHumedad();
  }, []);
  return (
    <div style={dashboardStyle.mainSector}>
      <ReportTable title="Humedad" weather={weather} loading={loading} sufijo="%" />
    </div>
  );
};
