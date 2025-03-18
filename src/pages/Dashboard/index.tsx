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
      <h3>WebSocket: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}</h3>
      <Row gutter={16}>
        <Col span={6}>
          <CartasDashboard
            title="Temperatura"
            value={ambientData?.tempf ?? liveSensorData.temperatura ?? 0}
            sufix={ambientData ? '°F' : units.temperatura}
            frequency="listDay"
            parameter="Temperatura"
          />
        </Col>
        <Col span={6}>
          <CartasDashboard
            title="Humedad"
            value={ambientData?.humidity ?? liveSensorData.humedad ?? 0}
            sufix="%"
            frequency="listDay"
            parameter="Humedad"
          />
        </Col>
        <Col span={6}>
          <CartasDashboard
            title="Luz"
            value={ambientData?.solarradiation ?? liveSensorData.luz ?? 0}
            sufix="W/m²"
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
    </div>
  );
};
