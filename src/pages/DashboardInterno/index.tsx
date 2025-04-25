import { useEffect } from "react";
import { Card, Col, Row } from "antd";
import { dashboardStyle } from "../../styles";
import { CartasDashboard, FetchDualDay } from "../../components";
import { FaTemperatureHigh } from "react-icons/fa";
import { LuSun, LuSunDim, LuCloudRainWind, LuCompass } from "react-icons/lu";
import { BsMoisture } from "react-icons/bs";
import { useGetLastData } from "../../hooks/useGetLastData";
import { Pages } from "../../constants/pages";
interface DashboardProps {
  setCurrentPage: (page: Pages) => void;
}

export const DashboardInterno = (setCurrentPage: DashboardProps) => {
  const { loading, getLastData, weather } = useGetLastData();
  useEffect(() => {
    getLastData();
    const interval = setInterval(() => {
      getLastData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  console.log(weather, "Peticion realizada");
  return (
    <div style={dashboardStyle.mainSector}>
      <h2 style={{ display: "flex", justifyContent: "center" }}>
        Variables Climáticas Ambiente Cerrado
      </h2>
      <Row gutter={16}>
        <Col span={50}>
          <CartasDashboard
            title="Temperatura Sensor"
            value={loading ? "Cargando..." : weather?.TemperaturaSensor.data}
            sufix="°C"
            parameter="TemperaturaInterna"
            icon={<FaTemperatureHigh size={44} color="#3f8600" />}
            tipo="line"
            data={0}
            setCurrentPage={setCurrentPage.setCurrentPage}
          />
        </Col>
        <Col span={50}>
          <CartasDashboard
            title="Humedad Sensor"
            value={loading ? "Cargando..." : weather?.HumedadSensor.data}
            sufix="%"
            parameter="HumedadSensor"
            icon={<BsMoisture size={44} color="#3f8600" />}
            tipo="line"
            data={weather?.HumedadSensor.data ?? 0}
            setCurrentPage={setCurrentPage.setCurrentPage}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={50}>
          <CartasDashboard
            title="Lumens"
            value={loading ? "Cargando..." : weather?.LuzSensor.data}
            sufix="%"
            parameter="LuzSensor"
            icon={<LuSun size={44} color="#3f8600" />}
            tipo="area"
            data={0}
            setCurrentPage={setCurrentPage.setCurrentPage}
          />
        </Col>
        <Col span={50}>
          <CartasDashboard
            title="Co2"
            value={loading ? "Cargando..." : weather?.HidrogenoSensor.data}
            sufix="ppp"
            parameter="HidrogenoSensor"
            tipo="bar"
            icon={<LuSun size={44} color="#3f8600" />}
            data={0}
            setCurrentPage={setCurrentPage.setCurrentPage}
          />
        </Col>
      </Row>
      <h2 style={{ display: "flex", justifyContent: "center" }}>
        Estacion Meteorológica Sensores internos
      </h2>
      <Row gutter={16}>
        <Col span={50}>
          <CartasDashboard
            title="Temperatura Interna"
            value={loading ? "Cargando..." : weather?.TemperaturaInterna.data}
            sufix="°C"
            parameter="TemperaturaInterna"
            icon={<FaTemperatureHigh size={44} color="#3f8600" />}
            tipo="line"
            data={0}
            setCurrentPage={setCurrentPage.setCurrentPage}
          />
        </Col>
        <Col span={50}>
          <CartasDashboard
            title="Humedad Interna"
            value={loading ? "Cargando..." : weather?.HumedadInterna.data}
            sufix="%"
            parameter="HumedadInterna"
            icon={<BsMoisture size={44} color="#3f8600" />}
            tipo="line"
            data={weather?.HumedadInterna.data ?? 0}
            setCurrentPage={setCurrentPage.setCurrentPage}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={50}>
          <Card
            title="Temperatura Externa vs Interna"
            style={{ marginTop: 20, width: 800 }}
          >
            <FetchDualDay
              parameter="TemperaturaExterna"
              parameter2="TemperaturaInterna"
            ></FetchDualDay>
          </Card>
        </Col>
        <Col span={50}>
        <Card
            title="Humedad Externa vs Interna"
            style={{ marginTop: 20, width: 800 }}
          >
            <FetchDualDay
              parameter="HumedadExterna"
              parameter2="HumedadInterna"
            ></FetchDualDay>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
