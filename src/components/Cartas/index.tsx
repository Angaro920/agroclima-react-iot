import { Button, Card, Statistic } from "antd";
import { CardStyle } from "./Cardstyle";
import { FetchDay } from "../FetchDay";
import { CollectionNameType } from "../../types";
import { ChartType } from "../../types/ChartType";
import { GaugeChartComponent } from "../ChartGauge";
import { RosaVientos } from "../ChartCompassRose";
import { FluidChartComponent } from "../ChartFluid";
import { PieChartComponent } from "../ChartPie";
import { BulletChartComponent } from "../ChartBullet";
import { Pages } from "../../constants/pages";

interface Props {
  title: string;
  value: number | string | undefined;
  sufix: string;
  parameter: CollectionNameType;
  icon?: React.ReactNode;
  tipo: ChartType;
  data: number | undefined;
  setCurrentPage: (page: Pages) => void;
}

export const CartasDashboard = ({
  title,
  value,
  sufix,
  parameter,
  data,
  icon,
  tipo,
  setCurrentPage
}: Props) => {

  function handleViewMore() {
    switch (parameter) {
      case "TemperaturaSensor":
        setCurrentPage(Pages.LISTTEMP);
        break;
      case "HumedadSensor":
        setCurrentPage(Pages.LISTHUM);
        break;
      case "LuzSensor":
        setCurrentPage(Pages.LISTLUZ);
        break;
      case "HidrogenoSensor":
        setCurrentPage(Pages.LISTHIDRO);
        break;
      case "TemperaturaExterna":
        setCurrentPage(Pages.LISTTEMPOUT);
        break;
      case "TemperaturaInterna":
        setCurrentPage(Pages.LISTTEMPIN);
        break;
      case "HumedadInterna":
        setCurrentPage(Pages.LISTHUMEIN);
        break;
      case "HumedadExterna":
        setCurrentPage(Pages.LISTHUMEOUT);
        break;
      case "PresionBarometricaRelativa":
        setCurrentPage(Pages.LISTBAROMREL);
        break;
      case "RadiacionSolar":
        setCurrentPage(Pages.LISTSOLARRAD);
        break;
      case "Uv":
        setCurrentPage(Pages.LISTUV);
        break;
      case "Precipitaciones":
        setCurrentPage(Pages.LISTEVENRAIN);
        break;
      default:
        console.error("Página no definida para el parámetro:", parameter);
    }
  }

  return (
    <div>
      <Card bordered={true} style={CardStyle.GlobalCard} title={title}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
          }}
        >
          <Statistic
            title="Actual"
            value={value}
            precision={2}
            valueStyle={{ color: "#3f8600" }}
            suffix={sufix}
          />
          {icon && (
            <div style={{ minWidth: "32px", marginLeft: "12px" }}>{icon}</div>
          )}
        </div>

        <FetchDay tipo={tipo} parameter={parameter} />

        {tipo === "gauge" ? (
          <GaugeChartComponent data={data} />
        ) : tipo === "rose" ? (
          <RosaVientos direccion={data} />
        ) : tipo === "liquid" ? (
          <FluidChartComponent data={data} />
        ) : tipo === "pie" ? (
          <PieChartComponent data={data} />
        ) : tipo === "bullet" ? (
          <BulletChartComponent data={data} />
        ) : null}

        <Button onClick={handleViewMore}>Ver más</Button>
      </Card>
    </div>
  );
};
