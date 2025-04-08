import { Button, Card, Modal, Statistic } from "antd";
import { CardStyle } from "./Cardstyle";
import { FetchDay } from "../FetchDay";
import { useState } from "react";
import { FetchWeek } from "../FetchWeek";
import { FetchMonth } from "../FetchMonth";
import { CollectionNameType } from "../../types";

interface Props {
  title: string;
  value: number | string | undefined;
  sufix: string;
  parameter: CollectionNameType
  icon?: React.ReactNode;
}
export const CartasDashboard = ({
  title,
  value,
  sufix,
  parameter,
  icon,
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
          <FetchDay parameter={parameter} />
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
