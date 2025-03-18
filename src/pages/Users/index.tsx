import { Button, message, Modal } from "antd";
import { UsersTable } from "../../components/UsersTable";
import { dashboardStyle } from "../../styles";
import { useEffect, useState } from "react";
import { FormUser } from "../../components";
import { useUsers } from "../../hooks/useUsers";
import type { UserType } from "../../types";

const INITIAL_FORM: UserType = {
  documento: "",
  userName: "",
  password: "",
  confirmPassword: "",
  name: "",
  email: "",
  age: 0,
  grade: "",
  type: "",
  tag: "",
};

export const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<UserType>(INITIAL_FORM);
  const { createUser, deleteUser, updateUser, loading, getUsers, users } =
    useUsers();

  useEffect(() => {
    getUsers();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData(INITIAL_FORM);
  };
  const handleAgregar = async () => {
    try {
      await createUser(formData);
      message.success("Usuario agregado correctamente");
      handleCancel(); 
    } catch (error) {
      message.error("Error al agregar el usuario: " + error);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      message.success("Usuario eliminado exitosamente");
    } catch (err) {
      message.error("Error al eliminar usuario: " + err);
    }
  };
  const handleUpdate = async (id: string) => {
    try {
      await updateUser(id, formData);
      message.success("Usuario actualizado exitosamente");
    } catch (err) {
      message.error("Error al actualizar usuario: " + err);
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
        <UsersTable
          users={users}
          loading={loading}
          onPressDelete={handleDelete}
          onPressUpdate={handleUpdate}
        />
      </div>
      <Modal
        title="Agregar Usuario"
        open={isModalOpen}
        onOk={handleAgregar}
        onCancel={handleCancel}
        footer={[
          <Button
            key="enviar"
            type="primary"
            onClick={handleAgregar}
            /* loading={loading} */
            htmlType="submit"
          >
            Agregar
          </Button>,
          <Button key="cancelar" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <FormUser formData={formData} setFormData={setFormData} />
      </Modal>
    </div>
  );
};
