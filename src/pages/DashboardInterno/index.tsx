import { useEffect, useState, useRef } from "react";
import { Card, Col, Row } from "antd";
import { dashboardStyle } from "../../styles";
import { CartasDashboard, FetchDualDay } from "../../components";
import { FaTemperatureHigh } from "react-icons/fa";
import { GiSaltShaker, GiDustCloud, GiMolecule  } from "react-icons/gi";
import { TbWavesElectricity } from "react-icons/tb";
import { LuSun } from "react-icons/lu";
import { BsMoisture } from "react-icons/bs";
import { useGetLastData } from "../../hooks/useGetLastData";
import { Pages } from "../../constants/pages";
import { ArrowDownOutlined, ArrowUpOutlined, ArrowRightOutlined } from "@ant-design/icons";

interface DashboardProps {
  setCurrentPage: (page: Pages) => void;
}

export const DashboardInterno = (setCurrentPage: DashboardProps) => {
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
      latestValuesRef.current = updatedCurrent; // persist for next cycle
    };

    updateData();
    const interval = setInterval(updateData, 300000);
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

    let prefixIcon = <ArrowRightOutlined />;
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
        Variables Climáticas Ambiente Cerrado
      </h2>
      <Row gutter={16}>
        <Col span={50}>
          {buildCard("Temperatura Sensor", "TemperaturaSensor", "°C", <FaTemperatureHigh size={44} color="#A59F96" />, "line", weather?.TemperaturaSensor.data)}
        </Col>
        <Col span={50}>
          {buildCard("Humedad Sensor", "HumedadSensor", "%", <BsMoisture size={44} color="#A59F96" />, "line", weather?.HumedadSensor.data)}
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={50}>
          {buildCard("Luz", "LuzSensor", "%", <LuSun size={44} color="#A59F96" />, "area", weather?.LuzSensor.data)}
        </Col>
       <Col span={50}>
          {buildCard("Ph", "PHSensor", " ", <GiMolecule size={44} color="#A59F96" />, "line", weather?.PHSensor.data)}
        </Col>
        <Col span={50}>
          {buildCard("Salinidad", "SalinidadSensor", "g/L", <GiSaltShaker size={44} color="#A59F96" />, "bar", weather?.SalinidadSensor.data)}
        </Col>
        <Col span={50}>
          {buildCard("Conductividad", "ConductividadSensor", "μS/cm", <TbWavesElectricity size={44} color="#A59F96" />, "bar", weather?.ConductividadSensor.data)}
        </Col>
        <Col span={50}>
          {buildCard("Solidos Disueltos", "TDSSensor", "ppm", <GiDustCloud size={44} color="#A59F96" />, "bar", weather?.TDSSensor.data)}
        </Col>
      </Row>
      <h2 style={dashboardStyle.titleH2}>
        Estacion Meteorológica Sensores internos
      </h2>
      <Row gutter={16}>
        <Col span={50}>
          {buildCard("Temperatura Interna", "TemperaturaInterna", "°C", <FaTemperatureHigh size={44} color="#A59F96" />, "line", weather?.TemperaturaInterna.data)}
        </Col>
        <Col span={50}>
          {buildCard("Humedad Interna", "HumedadInterna", "%", <BsMoisture size={44} color="#A59F96" />, "line", weather?.HumedadInterna.data)}
        </Col>
      </Row>
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
    </div>
  );
};
