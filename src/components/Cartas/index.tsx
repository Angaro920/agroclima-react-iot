import { Card, Statistic } from "antd";
import { CardStyle } from "./Cardstyle";
/* import { ArrowUpOutlined } from "@ant-design/icons"; */


interface Props {
  title: string;
}

export const CartasDashboard = ({ title }: Props) => {
  return (
    <Card title={title} bordered={false} style={CardStyle.GlobalCard}>
      <Statistic
        title={`${title} Actual`}
        value={11.28}
        precision={2}
        valueStyle={{ color: "#3f8600" }}
        prefix=""   
        suffix=""
      />
    </Card>
  );
};
