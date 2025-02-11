import { Col, Row } from "antd";
import { dashboardStyle } from "../../styles";
import {
  AreaChartComponent,
  CartasDashboard,
  LineChartComponent,
  ComposedChartComponent,
  BarChartComponent,
} from "../../components";
import { useWeather } from "../../contexts/DataContext";


export const Dashboard = () => {
  const { currentData, units } = useWeather();
  
  return (
    <div style={dashboardStyle.mainSector}>
      <Row gutter={16}>
        <Col span={6}>
          <CartasDashboard title={"Temperatura"} value={currentData.temperatura} sufix={units.temperatura}/>
        </Col>
        <Col span={6}>
          <CartasDashboard title="Humedad"  value={currentData.humedad} sufix={units.humedad} />
        </Col>
        <Col span={6}>
          <CartasDashboard title="Gas"  value={currentData.hidrogeno}  sufix={units.hidrogeno}/>
        </Col>
        <Col span={6}>
          <CartasDashboard title="Luz"   value={currentData.luz} sufix={units.luz}/>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <div style={dashboardStyle.chartdiv}>
            <LineChartComponent />
          </div>
        </Col>
        <Col span={6}>
          <div style={dashboardStyle.chartdiv}>
            <AreaChartComponent />
          </div>
        </Col>
        <Col span={6}>
          <div style={dashboardStyle.chartdiv}>
            <BarChartComponent />
          </div>
        </Col>
        <Col span={6}>
          <div style={dashboardStyle.chartdiv}>
            <LineChartComponent />
          </div>
        </Col>
      </Row>
      <div style={dashboardStyle.chartdiv}>
        <ComposedChartComponent />
      </div>
    </div>
  );
};
