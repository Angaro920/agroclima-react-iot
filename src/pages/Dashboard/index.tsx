import React from 'react';
import { Col, Row } from 'antd';
import { dashboardStyle } from '../../styles';
import { CartasDashboard } from '../../components';
import { useWeather } from '../../contexts/DataContext';
import useLiveSensorData from '../../hooks/useLiveSensorData';

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
          />
        </Col>
        <Col span={6}>
          <CartasDashboard
            title="Humedad"
            value={liveSensorData.humedad ?? 0}
            sufix="%"
            frequency="listDay"
            parameter="Humedad"
          />
        </Col>
        <Col span={6}>
          <CartasDashboard
            title="Luz"
            value={liveSensorData.luz ?? 0}
            sufix="%"
            frequency="listDay"
            parameter="Luz"
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
            />
        </Col>
        <Col span={6}>
        <CartasDashboard
            title="Humedad externa"
            value={ambientData?.humidity ?? 0}
            sufix="%"
            frequency="listDay"
            parameter="Humedad"
          />
          </Col>
          <Col span={6}>
          <CartasDashboard
            title="Presion atmosferica"
            value={ambientData?.baromabsin ?? 0}
            sufix="inHg"
            frequency="listDay"
            parameter="Luz"
            icono= "fas fa-cloud-sun"
          />
          </Col>
          <Col span={6}>
          <CartasDashboard
            title="Velocidad del viento"
            value={ambientData?.windspeedmph ?? 0}
            sufix="mph"
            frequency="listDay"
            parameter="Hidrogeno"
          />
          </Col>
          <Col span={6}>
          <CartasDashboard
            title="Direccion del viento"
            value={ambientData?.winddir ?? 0}
            sufix="°"
            frequency="listDay"
            parameter="Hidrogeno"
          />
          </Col>
          <Col span={6}>
          <CartasDashboard
            title="Radiacion solar"
            value={ambientData?.solarradiation ?? 0}
            sufix="W/m^2"
            frequency="listDay"
            parameter="Hidrogeno"
          />
          </Col>
      </Row>
    </div>
  );
};
