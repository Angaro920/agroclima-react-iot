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
  const { data, units } = useWeather();
  
  return (
    <div style={dashboardStyle.mainSector}>
      <Row gutter={16}>
        <Col span={6}>
          <CartasDashboard title={"Temperatura"} value={data.temperatura} sufix={units.temperatura}/>
        </Col>
        <Col span={6}>
          <CartasDashboard title="Humedad"  value={data.humedad} sufix={units.humedad} />
        </Col>
        <Col span={6}>
          <CartasDashboard title="Gas"  value={data.hidrogeno}  sufix={units.hidrogeno}/>
        </Col>
        <Col span={6}>
          <CartasDashboard title="Luz"   value={data.luz} sufix={units.luz}/>
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
