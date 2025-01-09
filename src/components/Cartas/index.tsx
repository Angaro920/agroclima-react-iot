import { Card, Button } from "antd";
import { CardStyle } from "./Cardstyle";
/* import { EllipsisOutlined } from "@ant-design/icons";
import { ReactNode } from "react"; */

interface Props {
  title: string;
}

/* const actions: ReactNode[] = [<EllipsisOutlined key="ellipsis" />]; */

export const CartasDashboard = ({ title }: Props) => {
  return (
    <Card
      title={title}
      bordered={false}
      style={CardStyle.GlobalCard}
      /* actions={actions} */
      onClick={() => console.log("click")}
    >
      <div>
      Aca va la info
      </div>
      <div style={{textAlign: "right"}}>
      <Button color="cyan" variant="filled" >
        Ver mas
      </Button>
      </div>
    </Card>
  );
};
