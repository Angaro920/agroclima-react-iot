import { Button, message, Modal } from "antd";
import { UsersTable } from "../../components/UsersTable";
import { dashboardStyle } from "../../styles";
import { useEffect, useState } from "react";
import { FormUser } from "../../components";
import { useUsers } from "../../hooks/useUsers";
import type { UserType } from "../../types";
import { useUser } from "../../hooks/useAuthUser";

const INITIAL_FORM: UserType = {
  id: "",
  _id: "",
  documento: "",
  userName: "",
  password: "",
  confirmPassword: "",
  name: "",
  email: "",
  age: 0,
  grade: "",
  tag: "",
};

export const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<UserType>(INITIAL_FORM);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const { user: authUser } = useUser();
  const { createUser, deleteUser, updateUser, loading, getUsers, users, getUserById } = useUsers();

  useEffect(() => {
    getUsers();
  }, []);

  const showModalForAdd = () => {
    setIsEditing(false);
    setSelectedUserId("");
    setFormData(INITIAL_FORM);
    setIsModalOpen(true);
  };

  const showModalForUpdate = async (id: string) => {
    if (!id || id === "undefined") {
      message.error("ID de usuario inválido");
      return;
    }

    try {
      setIsEditing(true);
      setSelectedUserId(id);

      const userToEdit = users.find(user => user._id === id);

      const userData = userToEdit ? userToEdit : await getUserById(id);

      if (!userData) {
        message.error("No se encontró el usuario");
        return;
      }

      setFormData({
        ...userData,
        password: "",
        confirmPassword: "",
      });

      setIsModalOpen(true);
    } catch (error) {
      message.error("Error al cargar los datos del usuario: " + error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData(INITIAL_FORM);
    setIsEditing(false);
    setSelectedUserId("");
  };

  const handleSubmit = async () => {
    try {
      if (!formData.documento || !formData.name || !formData.email) {
        message.error("Por favor completa los campos requeridos");
        return;
      }

      if (formData.password && formData.password !== formData.confirmPassword) {
        message.error("Las contraseñas no coinciden");
        return;
      }

      if (isEditing && selectedUserId) {
        const dataToUpdate: Partial<UserType> = {
          documento: formData.documento,
          name: formData.name,
          email: formData.email,
          age: formData.age,
          grade: formData.grade,
          tag: formData.tag,
        };

        if (formData.password?.trim()) {
          dataToUpdate.password = formData.password;
        }

        await updateUser(selectedUserId, dataToUpdate);
        message.success("Usuario actualizado exitosamente");
      } else {
        if (!formData.password) {
          message.error("La contraseña es requerida para crear un usuario");
          return;
        }

        await createUser(formData);
        message.success("Usuario agregado correctamente");
      }

      setIsModalOpen(false);
      setFormData(INITIAL_FORM);
      setIsEditing(false);
      setSelectedUserId("");
      getUsers();
    } catch (error) {
      const action = isEditing ? "actualizar" : "agregar";
      message.error(`Error al ${action} el usuario: ${error}`);
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

  return (
    <div style={dashboardStyle.mainSector}>
      <h1 style={{ display: "flex", justifyContent: "center" }}>Usuarios</h1>
      <div>
        <Button
          style={{ marginBottom: "10px" }}
          type="primary"
          onClick={showModalForAdd}
        >
          Agregar Usuario
        </Button>
      </div>
      <div>
        <UsersTable
          users={users}
          loading={loading}
          onPressDelete={handleDelete}
          onPressUpdate={showModalForUpdate}
        />
      </div>
      <Modal
        title={isEditing ? "Actualizar Usuario" : "Agregar Usuario"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={[
          <Button
            key="enviar"
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            htmlType="submit"
          >
            {isEditing ? "Actualizar" : "Agregar"}
          </Button>,
          <Button key="cancelar" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <FormUser 
          formData={formData}
          setFormData={setFormData}
          isEditing={isEditing}
          authUserTag={authUser?.tag || ""}
        />
      </Modal>
    </div>
  );
};
