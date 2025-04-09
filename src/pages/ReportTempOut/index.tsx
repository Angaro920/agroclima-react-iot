import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import { dashboardStyle } from "../../styles";
import useGetData from "../../hooks/useGetData";
import { Card, Col, Row } from "antd";
import { FetchWeek } from "../../components/FetchWeek";
import { FetchMonth } from "../../components/FetchMonth";


export const ReportTempOut = () => {
  const {weather, loading, getTempOut} = useGetData();
    
    useEffect(() => {
      getTempOut();
    }, []);
  return (
    <div style={dashboardStyle.mainSector}>
      <Row gutter={16}>
        <Col span={50}>
        <Card title="Reporte Semanal" style={{ width:800 }}>
          <FetchWeek parameter="TemperaturaExterna"/>
        </Card>
        </Col>
        <Col span={50}>
        <Card title="Reporte Mensual" style={{ width: 800 }}>
          <FetchMonth parameter="TemperaturaInterna"/>
        </Card>
        </Col>
      </Row>
      <ReportTable title="Temperatura Externa"loading={loading} weather={weather} sufijo="C°" />
    </div>
  );
};
