import { Card, Statistic } from "antd";
import { CardStyle } from "./Cardstyle";

interface Props {
  title: string;
  value: number;
  sufix: string;
}
export const CartasDashboard = ({ title, value, sufix }: Props) => {
  return (
    <Card bordered={false} style={CardStyle.GlobalCard} title={title}>
      <Statistic
        title={`Actual`}
        value={value}
        precision={2}
        valueStyle={{ color: "#3f8600" }}
        prefix=""
        suffix={sufix}
      />
    </Card>
  );
};
