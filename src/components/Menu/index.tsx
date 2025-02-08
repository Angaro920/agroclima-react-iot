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
import { useUser } from "../../hooks/useAuthUser"; 

type MenuItem = Required<MenuProps>["items"][number];

const getMenuItems = (tag: string): MenuItem[] => {
  const baseItems: MenuItem[] = [
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
        { key: Pages.LISTTEMP, label: "Temperatura", icon: <ExperimentOutlined /> },
        { key: Pages.LISTHUM, label: "Humedad", icon: <ExperimentOutlined /> },
        { key: Pages.LISTHIDRO, label: "Gas", icon: <ExperimentOutlined /> },
        { key: Pages.LISTLUZ, label: "Luz", icon: <ExperimentOutlined /> },
      ],
    },
  ];

  if (tag === "administrador") {
    baseItems.push(
      {
        key: Pages.DEVICES,
        label: "Dispositivos",
        icon: <ControlOutlined />,
      },
      {
        key: Pages.USERS,
        label: "Usuarios",
        icon: <TeamOutlined />,
      }
    );
  } else if (tag === "docente") {
    baseItems.push({
      key: Pages.DEVICES,
      label: "Dispositivos",
      icon: <ControlOutlined />,
    });
  }

  // Agregar el botón de cerrar sesión para todos los roles
  baseItems.push(
    { type: "divider" },
    {
      key: "logout",
      label: "Cerrar sesión",
      icon: <LogoutOutlined />,
    }
  );

  return baseItems;
};

export const MenuDashboard = ({ setCurrentPage }: { setCurrentPage: (key: string) => void }) => {
  const { user, loading } = useUser(); // Obtén el usuario autenticado

  if (loading) return <p>Cargando...</p>;

  // Filtra los elementos del menú según el rol del usuario
  const items = getMenuItems(user?.role || "estudiante");

  return (
    <Menu
      defaultSelectedKeys={["1"]}
      items={items}
      theme="dark"
      mode="inline"
      onClick={(event) => {
        if (event.key === "logout") {
          window.location.href = "/login";
        } else {
          setCurrentPage(event.key);
        }
      }}
    />
  );
};