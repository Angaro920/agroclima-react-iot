import { Col, Row } from "antd";
import { dashboardStyle } from "../../styles";
import { CartasDashboard } from "../../components";
import { useWeather } from "../../contexts/DataContext";

export const Dashboard = () => {
  const { currentData, units } = useWeather();
  return (
    <div style={dashboardStyle.mainSector}>
      <Row gutter={16}>
        <Col span={6}>
          <CartasDashboard
            title={"Temperatura"}
            value={currentData.temperatura}
            sufix={units.temperatura}
            frequency="listDay"
            parameter="Temperatura"
          />
        </Col>
        <Col span={6}>
          <CartasDashboard
            title="Humedad"
            value={currentData.humedad}
            sufix={units.humedad}
            frequency="listDay"
            parameter="Humedad"
          />
        </Col>
        <Col span={6}>
          <CartasDashboard
            title="Gas"
            value={currentData.hidrogeno}
            sufix={units.hidrogeno}
            frequency="listDay"
            parameter="Hidrogeno"
          />
        </Col>
        <Col span={6}>
          <CartasDashboard
            title="Luz"
            value={currentData.luz}
            sufix={units.luz}
            frequency="listDay"
            parameter="Luz"
          />
        </Col>
      </Row>
    </div>
  );
};
