import { useEffect, useState, useRef } from "react";
import { Card, Col, Row } from "antd";
import { dashboardStyle } from "../../styles";
import { CartasDashboard, FetchDualDay } from "../../components";
import { FaEquals, FaTemperatureHigh } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { WiBarometer } from "react-icons/wi";
import { LuSun, LuSunDim, LuCloudRainWind, LuCompass, LuEqual, LuEqualApproximately } from "react-icons/lu";
import { BsMoisture } from "react-icons/bs";
import { useGetLastData } from "../../hooks/useGetLastData";
import { Pages } from "../../constants/pages";
import { ArrowDownOutlined, ArrowRightOutlined, ArrowUpOutlined, MinusOutlined } from "@ant-design/icons";


interface DashboardProps {
  setCurrentPage: (page: Pages) => void;
}

export const DashboardExterno = (setCurrentPage: DashboardProps) => {
  const { loading, getLastData, weather } = useGetLastData();
  const [currentValues, setCurrentValues] = useState<Record<string, number | undefined>>({});
  const [previousValues, setPreviousValues] = useState<Record<string, number | undefined>>({});
  const [percentageChanges, setPercentageChanges] = useState<Record<string, number | undefined>>({});
  const [changeDirections, setChangeDirections] = useState<Record<string, "up" | "down" | "none">>({});
  const latestValuesRef = useRef<Record<string, number | undefined>>({});

  useEffect(() => {
    const updateData = async () => {
      const updated = await getLastData();

      const updatedCurrent: Record<string, number | undefined> = {};
      const updatedPrev: Record<string, number | undefined> = {};
      const updatedPerc: Record<string, number | undefined> = {};
      const directions: Record<string, "up" | "down" | "none"> = {};

      for (const key in updated) {
        const current = updated?.[key]?.data;
        const previous = latestValuesRef.current?.[key];
        updatedCurrent[key] = current;
        updatedPrev[key] = previous;

        if (typeof previous === "number" && typeof current === "number" && previous !== 0) {
          const change = ((current - previous) / Math.abs(previous)) * 100;
          updatedPerc[key] = change;
          directions[key] = change > 0 ? "up" : change < 0 ? "down" : "none";
        } else {
          updatedPerc[key] = undefined;
          directions[key] = "none";
        }
      }

      setCurrentValues(updatedCurrent);
      setPreviousValues(updatedPrev);
      setPercentageChanges(updatedPerc);
      setChangeDirections(directions);
      latestValuesRef.current = updatedCurrent;
    };

    updateData();
    const interval = setInterval(updateData, 60000);
    return () => clearInterval(interval);
  }, []);

  const buildCard = (
    title: string,
    param: string,
    suffix: string,
    icon: JSX.Element,
    tipo: string,
    dataValue: number | undefined
  ) => {
    const change = percentageChanges?.[param];
    const direction = changeDirections?.[param];
    const value = currentValues?.[param];

    let prefixIcon = <ArrowRightOutlined/>;
    let valueColor = "#707070";

    if (direction === "up") {
      prefixIcon = <ArrowUpOutlined />;
      valueColor = "#3f8600";
    } else if (direction === "down") {
      prefixIcon = <ArrowDownOutlined />;
      valueColor = "#cf1322";
    }

    return (
      <CartasDashboard
        title={title}
        value={loading ? "Cargando..." : value}
        previousValue={previousValues?.[param]}
        sufix={`${suffix} ${change !== undefined ? `(${change.toFixed(2)}%)` : ""}`}
        parameter={param as any}
        icon={icon}
        tipo={tipo as any}
        data={dataValue ?? 0}
        setCurrentPage={setCurrentPage.setCurrentPage}
        valueStyle={{ color: valueColor }}
        prefix={prefixIcon}
      />
    );
  };

  return (
    <div style={dashboardStyle.mainSector}>
      <h2 style={dashboardStyle.titleH2}>
        Variables Climáticas Ambiente Cerrado EXTERNO
      </h2>
      <Row gutter={16}>
        <Col span={50}>
          <Card title="Temperatura Externa vs Interna" style={{ marginTop: 20, width: 800 }}>
            <FetchDualDay parameter="TemperaturaExterna" parameter2="TemperaturaInterna" />
          </Card>
        </Col>
        <Col span={50}>
          <Card title="Humedad Externa vs Interna" style={{ marginTop: 20, width: 800 }}>
            <FetchDualDay parameter="HumedadExterna" parameter2="HumedadInterna" />
          </Card>
        </Col>
      </Row>
      <h2 style={dashboardStyle.titleH2}>
        Estacion Meteorologica Cielo Abierto
      </h2>
      <Row gutter={16}>
        <Col span={50}>
          {buildCard("Tempertaura externa", "TemperaturaExterna", "°C", <FaTemperatureHigh size={44} color="#3f8600" />, "line", weather?.TemperaturaExterna.data)}
        </Col>
        <Col span={50}>
          {buildCard("Humedad externa", "HumedadExterna", "%", <BsMoisture size={44} color="#3f8600" />, "line", weather?.HumedadExterna.data)}
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={50}>
          {buildCard("Presion atmosferica", "PresionBarometricaRelativa", "mmHg", <WiBarometer size={54} color="#3f8600" />, "gauge", weather?.PresionBarometricaRelativa.data)}
        </Col>
        <Col span={50}>
          {buildCard("Velocidad del viento", "VelocidadViento", "kph", <FiWind size={44} color="#3f8600" />, "area", weather?.VelocidadViento.data)}
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={50}>
          {buildCard("Direccion del viento", "DireccionViento", "°", <LuCompass size={44} color="#3f8600" />, "rose", weather?.DireccionViento.data)}
        </Col>
        <Col span={50}>
          {buildCard("Radiacion solar", "RadiacionSolar", "W/m²", <LuSun size={44} color="#3f8600" />, "bar", weather?.RadiacionSolar.data)}
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={50}>
          {buildCard("Radiacion UV", "Uv", "mJ/cm²", <LuSunDim size={44} color="#3f8600" />, "bullet", weather?.Uv.data)}
        </Col>
        <Col span={50}>
          {buildCard("Precipitaciones - Hoy", "Precipitaciones", "mm", <LuCloudRainWind size={44} color="#3f8600" />, "liquid", weather?.Precipitaciones.data)}
        </Col>
      </Row>
    </div>
  );
};
