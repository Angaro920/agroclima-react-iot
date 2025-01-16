import { Button, Modal } from "antd";
import { UsersTable } from "../../components/UsersTable";
import { dashboardStyle } from "../../styles";
import { useState } from "react";
import { FormAddUsers } from "../../components";
interface FieldType {

  username?: string;
  password?: string;
  name?: string;
  lastName?: string;
  age?: number;
  grade?: string;
  type?: string;

}

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

  const [formData, setFormData] = useState<FieldType>({
    username : "",
    password: "",
    name: "",
    lastName:"",
    age: 0,
    grade:"",
    type:"",
  })

  const handleAgregar = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Usuario agregado correctamente: " + JSON.stringify(data));
        setIsModalOpen(false); // Cierra el modal
      } else {
        alert("Error al agregar el usuario.");
      }
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
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
            onClick={handleAgregar}
            htmlType="submit"
          >
            Agregar
          </Button>,
          <Button key="cancelar" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <FormAddUsers formData={formData} setFormData={setFormData} />
      </Modal>
    </div>
  );
};
