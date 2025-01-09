import {
  ControlOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  ExperimentOutlined,
  LogoutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Pages } from "../../constants/pages";


console.log(Pages);

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: Pages.DASHBOARD,
    label: "Dashboard",
    icon: <DashboardOutlined />,
  },
  {
    key: "Reports",
    label: "Reportes",
    icon: <DatabaseOutlined />,
    children: [
      {key: Pages.LISTTEMP, label: "Temperatura", icon: <ExperimentOutlined />},
      {key: Pages.LISTHUM, label: "Humedad", icon:<ExperimentOutlined /> },
      {key: Pages.LISTHIDRO, label: "Gas", icon: <ExperimentOutlined />},
      {key: Pages.LISTLUZ, label: "Luz", icon: <ExperimentOutlined />},
    ]
  },
  {
    key: Pages.DEVICES,
    label: "Dispositivos",
    icon: <ControlOutlined />,
  },
  {
    key: Pages.USERS,
    label: "Usuarios",
    icon: <TeamOutlined />,
  },
  {
    type: "divider",
  },
  {
    key: "logout",
    label: "Cerrar sesion",
    icon: <LogoutOutlined />,
  },
];

export const MenuDashboard = ({ setCurrentPage }: { setCurrentPage: (key: string) => void }) => {
  return (
    <Menu defaultSelectedKeys={['1']} items={items} theme="dark" mode='inline' onClick={(event) => {setCurrentPage(event.key)}}/>
  )
}
