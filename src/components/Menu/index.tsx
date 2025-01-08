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

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <DashboardOutlined />,
  },
  {
    key: "maquinas",
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

export const MenuDashboard = () => {
  return (
    <Menu
      defaultSelectedKeys={["1"]}
      items={items}
      theme="light"
      mode="inline"
    />
  );
};
