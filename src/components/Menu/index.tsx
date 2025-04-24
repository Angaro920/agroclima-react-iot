import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Menu } from "antd"; // Modal agregado
import { useUser } from "../../hooks/useAuthUser";
import { useAuth } from "../../hooks/useAuth"; 
import { Pages } from "../../constants/pages";
import {
  ControlOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { FormReport } from "../FormReport";
import { FormAuditReport } from "../FormAuditReport";
import { GiGreenhouse, GiSunCloud, GiHouse} from "react-icons/gi";


type MenuItem = Required<MenuProps>["items"][number];

// Ahora "Reportes" no tendrá hijos
const getMenuItems = (tag: string): MenuItem[] => {
  const baseItems: MenuItem[] = [
    {
      key: "Dashboard",
      label: "Dashboard",
      icon: <DashboardOutlined />,
      children: [
        {
          key: Pages.DASHBOARD,
          label: "Inicio",
          icon: <GiHouse />,
        },
        {
          key: Pages.DASHBOARDINTERNO,
          label: "Interno",
          icon: <GiGreenhouse />,
        },
        {
          key: Pages.DASHBOARDEXTERNO,
          label: "Externo",
          icon: <GiSunCloud />,
        },
      ],
    },
    {
      key: "Reports", // Mantienes este
      label: "Reportes",
      icon: <DatabaseOutlined />,
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
      },
      {
        key: "AuditReport", 
        label: "Auditoría",
        icon: <DatabaseOutlined />,
      }
    );
  } else if (tag === "docente") {
    baseItems.push({
      key: Pages.DEVICES,
      label: "Dispositivos",
      icon: <ControlOutlined />,
    });
  }

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
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false); // <-- Modal para Reportes
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false); // NUEVO

  if (loading) return <p>Cargando...</p>;

  const items = getMenuItems(user?.tag || "estudiante");

  const handleMenuClick = (event: { key: string }) => {
    if (event.key === "logout") {
      // Llama al logout y maneja la redirección dentro de la función logout
      logout().catch(error => {
        console.error("Error durante logout:", error);
        // Redirección de respaldo en caso de error
        navigate("/login", { replace: true });
      });
    } else if (event.key === "Reports") {
      setIsReportsModalOpen(true);
    } else if (event.key === "AuditReport") {
      setIsAuditModalOpen(true);
    } else {
      setCurrentPage(event.key);
    }
  };

  return (
    <>
      <Menu
        defaultSelectedKeys={["1"]}
        items={items}
        theme="dark"
        mode="inline"
        onClick={handleMenuClick}
      />
      
      {/* Modal de Reportes */}
      <Modal
        title="Generar Reporte"
        open={isReportsModalOpen}
        onOk={() => setIsReportsModalOpen(false)}
        onCancel={() => setIsReportsModalOpen(false)}
        width={700}
      >
        <FormReport />
      </Modal>

            {/* Modal de Reporte de Auditoría */}
      <Modal
        title="Reporte de Auditoría"
        open={isAuditModalOpen}
        onOk={() => setIsAuditModalOpen(false)}
        onCancel={() => setIsAuditModalOpen(false)}
        width={700}
      >
        <FormAuditReport />
      </Modal>
    </>
  );
};