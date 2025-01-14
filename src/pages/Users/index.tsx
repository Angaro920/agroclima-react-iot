import { Button, Modal} from "antd";
import { UsersTable } from "../../components/UsersTable";
import { dashboardStyle } from "../../styles";
import { useState } from "react";
import { FormAddUsers } from "../../components";
export const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={dashboardStyle.mainSector}>
      <h1 style={{ display: "flex", justifyContent: "center" }}>Usuarios</h1>
      <div>
        <Button
          style={{ marginBottom: "10px" }}
          variant="solid"
          color="blue"
          onClick={showModal}
        >
          Agregar Usuario
        </Button>
      </div>
      <div>
        <UsersTable />
      </div>
      <Modal
        title="Agregar Usuario"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="enviar"
            type="primary"
            onClick={handleOk}
            htmlType="submit"
          >
            Agregar
          </Button>,
          <Button key="cancelar" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <FormAddUsers />
      </Modal>
    </div>
  );
};
