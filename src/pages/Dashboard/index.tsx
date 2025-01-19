import { Col, Row } from "antd";
import { dashboardStyle } from "../../styles";
import {
  AreaChartComponent,
  CartasDashboard,
  LineChartComponent,
  ComposedChartComponent,
  BarChartComponent,
} from "../../components";
import { useDataContext } from "../../contexts/DataContext";


export const Dashboard = () => {
  const { currentData } = useDataContext();
  
  return (
    <div style={dashboardStyle.mainSector}>
      <Row gutter={16}>
        <Col span={6}>
          <CartasDashboard title={"Temperatura"} value={currentData.temperature.value} />
        </Col>
        <Col span={6}>
          <CartasDashboard title="Humedad"  value={currentData.humidity.value} />
        </Col>
        <Col span={6}>
          <CartasDashboard title="Gas"  value={currentData.gas.value} />
        </Col>
        <Col span={6}>
          <CartasDashboard title="Luz"   value={currentData.gas.value}/>
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
