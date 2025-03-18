import { Button, Card, Modal, Statistic } from "antd";
import { CardStyle } from "./Cardstyle";
import { FetchDay } from "../FetchDay";
import { useState } from "react";
import { FetchWeek } from "../FetchWeek";
import { FetchMonth } from "../FetchMonth";

interface Props {
  title: string;
  value: number;
  sufix: string;
  frequency: "listDay" | "listWeek" | "listMonth";
  parameter: "Temperatura" | "Humedad" | "Hidrogeno" | "Luz";
}
export const CartasDashboard = ({
  title,
  value,
  sufix,
  parameter,
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
      <Card bordered={false} style={CardStyle.GlobalCard} title={title}>
        <Statistic
          title={`Actual`}
          value={value}
          precision={2}
          valueStyle={{ color: "#3f8600" }}
          prefix=""
          suffix={sufix}
        />
        <div></div>
        <Button onClick={showModal}>Ver mas...</Button>
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
        <FetchDay frequency="listDay" parameter={parameter} />
        </div>
        <div>
          <h3>Semanal</h3>
        <FetchWeek frequency="listWeek" parameter={parameter} />
        </div>
        <div>
          <h3>Mensual</h3>
        <FetchMonth frequency="listMonth" parameter={parameter} />
        </div>
      </Modal>
    </div>
  );
};
