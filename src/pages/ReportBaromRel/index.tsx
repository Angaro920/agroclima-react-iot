import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import { dashboardStyle } from "../../styles";
import useGetData from "../../hooks/useGetData";
import { Card, Col, Row } from "antd";
import { FetchWeek } from "../../components/FetchWeek";
import { FetchMonth } from "../../components/FetchMonth";


export const ReportBaromRel = () => {
  const {weather, loading, getBaromRel} = useGetData();
    
    useEffect(() => {
      getBaromRel();
    }, []);
  return (
    <div style={dashboardStyle.mainSector}>
      <Row gutter={16}>
        <Col span={50}>
        <Card title="Reporte Semanal" style={{ width:800 }}>
          <FetchWeek parameter="PresionBarometricaRelativa"/>
        </Card>
        </Col>
        <Col span={50}>
        <Card title="Reporte Mensual" style={{ width: 800 }}>
          <FetchMonth parameter="PresionBarometricaRelativa"/>
        </Card>
        </Col>
      </Row>
      <ReportTable title="Presion Atmosferica Relativa"loading={loading} weather={weather} sufijo="in/gh" />
    </div>
  );
};
