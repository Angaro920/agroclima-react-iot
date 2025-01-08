import { Card } from "antd";
import { CardStyle } from "./Cardstyle";

interface Props {
  title: string;
}


export const CartasDashboard = ({title}: Props) => {
  return (
    <Card title={title} bordered={false} style={CardStyle.GlobalCard}>
    </Card>
  );
};
