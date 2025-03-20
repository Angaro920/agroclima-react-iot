import React from 'react';
import { Col, Row } from 'antd';
import { dashboardStyle } from '../../styles';
import { CartasDashboard } from '../../components';
import { useWeather } from '../../contexts/DataContext';
import useLiveSensorData from '../../hooks/useLiveSensorData';

//Import de iconos 

import { FaTemperatureHigh,  } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { WiBarometer } from "react-icons/wi";
import { LuSun, LuSunDim, LuCloudRainWind,LuCompass } from "react-icons/lu";
import { BsMoisture } from "react-icons/bs";

export const Dashboard = () => {
  const { currentData, units } = useWeather();
  const { sensorData, ambientData, isConnected } = useLiveSensorData();

  const liveSensorData = sensorData || currentData;

  return (
    <div style={dashboardStyle.mainSector}>
       <h1 style={{ display: "flex", justifyContent: "center" }}>
                Sensores: {isConnected ? "🟢" : "🔴"}
            </h1>
      <Row gutter={16}>
        <Col span={6}>
          <CartasDashboard
            title="Temperatura"
            value={ liveSensorData.temperatura ?? 0}
            sufix={ambientData ? '°F' : units.temperatura}
            frequency="listDay"
            parameter="Temperatura"
            icon={<FaTemperatureHigh size={44} color="#3f8600" />}
            />
        </Col>
        <Col span={6}>
          <CartasDashboard
            title="Humedad"
            value={liveSensorData.humedad ?? 0}
            sufix="%"
            frequency="listDay"
            parameter="Humedad"
            icon={<BsMoisture size={44} color="#3f8600" />}
            />
        </Col>
        <Col span={6}>
          <CartasDashboard
            title="Luz"
            value={liveSensorData.luz ?? 0}
            sufix="%"
            frequency="listDay"
            parameter="Luz"
            icon={<LuSun size={44} color="#3f8600" />}
            />
        </Col>
        <Col span={6}>
          <CartasDashboard
            title="Gas"
            value={liveSensorData.hidrogeno ?? 0}
            sufix={units.hidrogeno}
            frequency="listDay"
            parameter="Hidrogeno"
            />
        </Col>
      </Row>
      <h2 style={{ display: "flex", justifyContent: "center" }}>
        Estacion Meteorologica Sensores Dashboard
      </h2>
      <Row gutter={16}>
      <Col span={6}>
          <CartasDashboard
            title="Tempertaura Interna"
            value={ambientData?.tempinf ?? 0}
            sufix="°C"
            frequency="listDay"
            parameter="Temperatura"
            icon={<FaTemperatureHigh size={44} color="#3f8600" />}
            />
        </Col>
      <Col span={6}>
          <CartasDashboard
            title="Humedad Interna"
            value={ambientData?.humidityin ?? 0}
            sufix="%"
            frequency="listDay"
            parameter="Temperatura"
            icon={<BsMoisture size={44} color="#3f8600" />}
            />
        </Col>
      </Row>
      <h2 style={{ display: "flex", justifyContent: "center" }}>
        Estacion Meteorologica
      </h2>
      <Row gutter={16}>
        <Col span={6}>
          <CartasDashboard
            title="Tempertaura externa"
            value={ambientData?.tempf ?? 0}
            sufix="°F"
            frequency="listDay"
            parameter="Temperatura"
            icon={<FaTemperatureHigh size={44} color="#3f8600" />}
            />
        </Col>
        
        <Col span={6}>
        <CartasDashboard
            title="Humedad externa"
            value={ambientData?.humidity ?? 0}
            sufix="%"
            frequency="listDay"
            parameter="Humedad"
            icon={<BsMoisture size={44} color="#3f8600" />}
            />
          </Col>
          <Col span={6}>
          <CartasDashboard
            title="Presion atmosferica"
            value={ambientData?.baromabsin ?? 0}
            sufix="inHg"
            frequency="listDay"
            parameter="Luz"
            icon={<WiBarometer size={54} color="#3f8600" />}
            />
          </Col>
          <Col span={6}>
          <CartasDashboard
            title="Velocidad del viento"
            value={ambientData?.windspeedmph ?? 0}
            sufix="mph"
            frequency="listDay"
            parameter="Hidrogeno"
            icon={<FiWind size={44} color="#3f8600" />}
            />
          </Col>
          <Col span={6}>
          <CartasDashboard
            title="Direccion del viento"
            value={ambientData?.winddir ?? 0}
            sufix="°"
            frequency="listDay"
            parameter="Hidrogeno"
            icon={<LuCompass size={44} color="#3f8600" />}
            />
          </Col>
          <Col span={6}>
          <CartasDashboard
            title="Radiacion solar"
            value={ambientData?.solarradiation ?? 0}
            sufix="W/m^2"
            frequency="listDay"
            parameter="Hidrogeno"
            icon={<LuSun size={44} color="#3f8600" />}
            />
          </Col>
          <Col span={6}>
          <CartasDashboard
            title="Radiacion UV"
            value={ambientData?.uv ?? 0}
            sufix="mJ/cm²"
            frequency="listDay"
            parameter="Hidrogeno"
            icon={<LuSunDim size={44} color="#3f8600" />}
            />
          </Col>
          <Col span={6}>
          <CartasDashboard
            title="Precipitaciones - Hoy"
            value={ambientData?.eventrainin ?? 0}
            sufix="in"
            frequency="listDay"
            parameter="Hidrogeno"
            icon={<LuCloudRainWind size={44} color="#3f8600" />}
            />
          </Col>
      </Row>
    </div>
  );
};
