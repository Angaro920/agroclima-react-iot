import {
  DashboardOutlined,
  ExperimentOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
  UserSwitchOutlined,
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
    key: Pages.DEVICES,
    label: "maquinas",
    icon: <ExperimentOutlined />,
  },
  {
    key: "users",
    label: "Usuarios",
    icon: <TeamOutlined />,
    children: [
      { key: "add", label: "Agregar", icon: <UserAddOutlined /> },
      { key: "delete", label: "Eliminar", icon: <UserDeleteOutlined /> },
      { key: "update", label: "Editar", icon: <UserSwitchOutlined /> },
      { key: "read", label: "Listar", icon: <UserOutlined /> },
    ],
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

export const MenuDashboard = ({setCurrentPage}) => {
  return (
    <Menu defaultSelectedKeys={['1']} items={items} theme="dark" mode='inline' onClick={(event) => {setCurrentPage(event.key)}}/>
  )
}
