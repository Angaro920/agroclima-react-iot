import { Button, Card, Modal, Statistic } from "antd";
import { CardStyle } from "./Cardstyle";
import { FetchDay } from "../FetchDay";
import { useState } from "react";
import { FetchWeek } from "../FetchWeek";
import { FetchMonth } from "../FetchMonth";
import { CollectionNameType } from "../../types";
import { ChartType } from "../../types/ChartType";
import { GaugeChartComponent } from "../ChartGauge";
import {RosaVientos} from "../ChartCompassRose";

interface Props {
  title: string;
  value: number | string | undefined;
  sufix: string;
  parameter: CollectionNameType;
  icon?: React.ReactNode;
  tipo: ChartType;
  data: number | undefined;
}
export const CartasDashboard = ({
  title,
  value,
  sufix,
  parameter,
  data,
  icon,
  tipo,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
          {/* Value Left */}
          <Statistic
            title="Actual"
            value={value}
            precision={2}
            valueStyle={{ color: "#3f8600" }}
            suffix={sufix}
          />

          {/* Icon Right */}
          {icon && (
            <div style={{ minWidth: "32px", marginLeft: "12px" }}>{icon}</div>
          )}
        </div>
        <FetchDay tipo={tipo} parameter={parameter} />
        {}
        {tipo === "gauge" ? (
          <GaugeChartComponent data={data} />
        ) : tipo === "rose" ? (
          <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">
              Rosa de los Vientos
            </h1>
            <RosaVientos direccion={data} />
          </div>
        ) : null}

        <Button onClick={showModal}>Ver más</Button>
      </Card>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
        width={850}
      >
        <div>
          <h3>Diario</h3>
          <FetchDay tipo={tipo} parameter={parameter} />
        </div>
        <div>
          <h3>Semanal</h3>
          <FetchWeek parameter={parameter} />
        </div>
        <div>
          <h3>Mensual</h3>
          <FetchMonth parameter={parameter} />
        </div>
      </Modal>
    </div>
  );
};
