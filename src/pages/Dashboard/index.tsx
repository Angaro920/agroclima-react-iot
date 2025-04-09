import { useEffect } from "react";
import { Col, Row } from "antd";
import { dashboardStyle } from "../../styles";
import { CartasDashboard } from "../../components";
import { FaTemperatureHigh } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { WiBarometer } from "react-icons/wi";
import { LuSun, LuSunDim, LuCloudRainWind, LuCompass } from "react-icons/lu";
import { BsMoisture } from "react-icons/bs";
import { useGetLastData } from "../../hooks/useGetLastData";
import { Pages } from "../../constants/pages";
interface DashboardProps {
  setCurrentPage: (page: Pages) => void;
}

export const Dashboard = (setCurrentPage : DashboardProps) => {
  const { loading, getLastData, weather } = useGetLastData();
  useEffect(() => {
    getLastData();
    const interval = setInterval(() => {
      getLastData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  
  console.log(weather, "Peticion realizada")
  return (
    <div style={dashboardStyle.mainSector}>
      <h2 style={{ display: "flex", justifyContent: "center" }}>
        Variables climaticas ambiente cerrado
      </h2>
      <Row gutter={16}>
        <Col span={50}>
          <CartasDashboard
            title="Tempertaura Sensor"
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
            title="Humedad"
            value={loading ? "Cargando..." : weather?.HumedadSensor.data}
            sufix="%"
            parameter="HumedadSensor"
            icon={<BsMoisture size={44} color="#3f8600" />}
            tipo="gauge"
            data={weather?.HumedadSensor.data}
            setCurrentPage={setCurrentPage.setCurrentPage}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={50}>
          <CartasDashboard
            title="Luz"
            value={loading ? "Cargando..." : weather?.LuzSensor.data}
            sufix="%"
            parameter="LuzSensor"
            icon={<LuSun size={44} color="#3f8600" />}
            tipo="bar"
            data={0}
            setCurrentPage={setCurrentPage.setCurrentPage}
          />
        </Col>
        <Col span={50}>
          <CartasDashboard
            title="Gas"
            value={loading ? "Cargando..." : weather?.HidrogenoSensor.data}
            sufix="ppp"
            parameter="HidrogenoSensor"
            tipo="line"
            icon={<LuSun size={44} color="#3f8600" />}
            data={0}
            setCurrentPage={setCurrentPage.setCurrentPage}
          />
        </Col>
      </Row>
      <h2 style={{ display: "flex", justifyContent: "center" }}>
        Estacion Meteorologica Sensores internos
      </h2>
      <Row gutter={16}>
        <Col span={50}>
          <CartasDashboard
            title="Tempertaura Interna"
            value={loading ? "Cargando..." : weather?.TemperaturaInterna.data}
            sufix="°C"
            parameter="TemperaturaInterna"
            icon={<FaTemperatureHigh size={44} color="#3f8600" />}
            tipo="area"
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
            tipo="gauge"
            data={weather?.HumedadInterna.data}
            setCurrentPage={setCurrentPage.setCurrentPage}
          />
        </Col>
      </Row>
      <h2 style={{ display: "flex", justifyContent: "center" }}>
        Estacion Meteorologica Cielo Abierto
      </h2>
      <Row gutter={16}>
        <Col span={50}>
          <CartasDashboard
            title="Tempertaura externa"
            value={loading ? "Cargando..." : weather?.TemperaturaExterna.data}
            sufix="°C"
            parameter="TemperaturaExterna"
            icon={<FaTemperatureHigh size={44} color="#3f8600" />}
            tipo="line"
            data={0}
            setCurrentPage={setCurrentPage.setCurrentPage}
          />
        </Col>

        <Col span={50}>
          <CartasDashboard
            title="Humedad externa"
            value={loading ? "Cargando..." : weather?.HumedadExterna.data}
            sufix="%"
            parameter="HumedadExterna"
            icon={<BsMoisture size={44} color="#3f8600" />}
            tipo="gauge"
            data={weather?.HumedadExterna.data}
            setCurrentPage={setCurrentPage.setCurrentPage}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={50}>
          <CartasDashboard
            title="Presion atmosferica"
            value={
              loading ? "Cargando..." : weather?.PresionBarometricaRelativa.data
            }
            sufix="inHg"
            parameter="PresionBarometricaRelativa"
            icon={<WiBarometer size={54} color="#3f8600" />}
            tipo="bar"
            data={0}
            setCurrentPage={setCurrentPage.setCurrentPage}
          />
        </Col>
        <Col span={50}>
          <CartasDashboard
            title="Velocidad del viento"
            value={loading ? "Cargando..." : weather?.VelocidadViento.data}
            sufix="mph"
            parameter="VelocidadViento"
            icon={<FiWind size={44} color="#3f8600" />}
            tipo="area"
            data={0}
            setCurrentPage={setCurrentPage.setCurrentPage}
          />
        </Col>
        </Row>
      <Row gutter={16}>
        <Col span={50}>
          <CartasDashboard
            title="Direccion del viento"
            value={loading ? "Cargando..." : weather?.DireccionViento.data}
            sufix="°"
            parameter="DireccionViento"
            icon={<LuCompass size={44} color="#3f8600" />}
            tipo="rose"
            data={weather?.DireccionViento.data}
            setCurrentPage={setCurrentPage.setCurrentPage}
          />
        </Col>
        <Col span={50}>
          <CartasDashboard
            title="Radiacion solar"
            value={loading ? "Cargando..." : weather?.RadiacionSolar.data}
            sufix="W/m²"
            parameter="RadiacionSolar"
            icon={<LuSun size={44} color="#3f8600" />}
            tipo="bar"
            data={0}
            setCurrentPage={setCurrentPage.setCurrentPage}
          />
        </Col>
        </Row>
      <Row gutter={16}>
        <Col span={50}>
          <CartasDashboard
            title="Radiacion UV"
            value={loading ? "Cargando..." : weather?.Uv.data}
            sufix="mJ/cm²"
            parameter="Uv"
            icon={<LuSunDim size={44} color="#3f8600" />}
            tipo="bullet"
            data={weather?.Uv.data}
            setCurrentPage={setCurrentPage.setCurrentPage}
          />
        </Col>
        <Col span={50}>
          <CartasDashboard
            title="Precipitaciones - Hoy"
            value={loading ? "Cargando..." : weather?.Precipitaciones.data}
            sufix="in"
            parameter="Precipitaciones"
            icon={<LuCloudRainWind size={44} color="#3f8600" />}
            tipo="liquid"
            data={weather?.Precipitaciones.data}
            setCurrentPage={setCurrentPage.setCurrentPage}
          />
      
        </Col>
      </Row>
    </div>
  );
};
