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
import { useAuth } from "../../hooks/useAuth"; 

type MenuItem = Required<MenuProps>["items"][number];

// Función para generar los elementos del menú según el tag
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
  const { user, loading } = useUser();
  const { logout } = useAuth();  // Obtén el usuario autenticado

  if (loading) return <p>Cargando...</p>;

  // Filtra los elementos del menú según el tag del usuario
  const items = getMenuItems(user?.tag || "estudiante");

  return (
    <Menu
      defaultSelectedKeys={["1"]}
      items={items}
      theme="dark"
      mode="inline"
      onClick={(event) => {
        if (event.key === "logout") {
          logout(); // Cierra la sesión
          window.location.href = "/login"; // Redirige al login
        } else {
          setCurrentPage(event.key);
        }
      }}
    />
  );
};