import { Col, Row } from "antd";
import { dashboardStyle } from "../../styles";
import {
  AreaChartComponent,
  CartasDashboard,
  LineChartComponent,
  ComposedChartComponent,
  BarChartComponent,
} from "../../components";

export const Dashboard = () => {
  return (
    <div style={dashboardStyle.mainSector}>
      <Row gutter={16}>
        <Col span={6}>
          <CartasDashboard title="Temperatura" />
        </Col>
        <Col span={6}>
          <CartasDashboard title="Humedad" />
        </Col>
        <Col span={6}>
          <CartasDashboard title="Gas" />
        </Col>
        <Col span={6}>
          <CartasDashboard title="Luz" />
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
