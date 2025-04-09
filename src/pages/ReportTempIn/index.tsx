import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import { dashboardStyle } from "../../styles";
import useGetData from "../../hooks/useGetData";
import { Card, Col, Row } from "antd";
import { FetchWeek } from "../../components/FetchWeek";
import { FetchMonth } from "../../components/FetchMonth";


export const ReportTempIn = () => {
  const {weather, loading, getTempIn} = useGetData();
    
    useEffect(() => {
      getTempIn();
    }, []);
  return (
    <div style={dashboardStyle.mainSector}>
      <Row gutter={16}>
        <Col span={50}>
        <Card title="Reporte Semanal" style={{ width:800 }}>
          <FetchWeek parameter="TemperaturaInterna"/>
        </Card>
        </Col>
        <Col span={50}>
        <Card title="Reporte Mensual" style={{ width: 800 }}>
          <FetchMonth parameter="TemperaturaInterna"/>
        </Card>
        </Col>
      </Row>
      <ReportTable title="Temperatura Interna"loading={loading} weather={weather} sufijo="C°" />
    </div>
  );
};
