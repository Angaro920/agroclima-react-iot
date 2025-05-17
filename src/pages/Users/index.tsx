import { Button, message, Modal } from "antd";
import { UsersTable } from "../../components/UsersTable";
import { dashboardStyle } from "../../styles";
import { useEffect, useState } from "react";
import { FormUser } from "../../components";
import { useUsers } from "../../hooks/useUsers";
import type { UserType } from "../../types";

const INITIAL_FORM: UserType = {
  id: "",
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
  const { createUser, deleteUser, updateUser, loading, getUsers, users, getUserById } =
    useUsers();

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
    try {
      setIsEditing(true);
      setSelectedUserId(id);
      
      // Buscar el usuario en el estado actual primero
      const userToEdit = users.find(user => user.id === id);
      
      if (userToEdit) {
        // Si encontramos el usuario en el estado, lo usamos directamente
        setFormData({
          ...userToEdit,
          // Mantener los campos de contraseña vacíos al editar
          password: "",
          confirmPassword: "",
        });
      } else {
        // Si no está en el estado, lo buscamos por API
        const userFromApi = await getUserById(id);
        if (userFromApi) {
          setFormData({
            ...userFromApi,
            password: "",
            confirmPassword: "",
          });
        }
      }
      
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
      // Validar que los datos no estén vacíos
      if (!formData.documento || !formData.name || !formData.email) {
        message.error("Por favor completa los campos requeridos");
        return;
      }

      // Validar que las contraseñas coincidan si se están proporcionando
      if (formData.password && formData.password !== formData.confirmPassword) {
        message.error("Las contraseñas no coinciden");
        return;
      }

      if (isEditing && selectedUserId) {
        // Para actualización, creamos un objeto con solo las propiedades que queremos actualizar
        const dataToUpdate: Partial<UserType> = {
          documento: formData.documento,
          name: formData.name,
          email: formData.email,
          age: formData.age,
          grade: formData.grade,
          tag: formData.tag,
        };
        
        // Solo incluimos la contraseña si se proporcionó una nueva
        if (formData.password && formData.password.trim() !== '') {
          dataToUpdate.password = formData.password;
        }
        
        await updateUser(selectedUserId, dataToUpdate);
        message.success("Usuario actualizado exitosamente");
      } else {
        // Validar que todos los campos requeridos estén presentes para la creación
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
      
      // Recargar la lista de usuarios
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
          variant="solid"
          color="blue"
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
        />
      </Modal>
    </div>
  );
};