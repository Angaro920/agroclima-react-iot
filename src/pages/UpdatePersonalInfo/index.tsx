import { useState, useEffect } from "react";
import { Button, message, Modal, Card } from "antd";
import { dashboardStyle } from "../../styles";
import { FormUser } from "../../components";
import { useUsers } from "../../hooks/useUsers";
import { useUser } from "../../hooks/useAuthUser"; // Tu hook ya configurado
import type { UserType } from "../../types";

const INITIAL_FORM: UserType = {
  id :"",
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

export const InfoUpdate = () => {
  const { user: authUser, loading: userLoading, error } = useUser();
  const { updateUser, loading } = useUsers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<UserType>(INITIAL_FORM);

  // Cuando ya se carga el usuario autenticado, se setea en el formulario
  useEffect(() => {
    if (authUser) {
      setFormData({
        ...authUser,
        password: "",
        confirmPassword: "",
      });
    }
  }, [authUser]);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      message.error("Por favor completa los campos requeridos");
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      message.error("Las contraseñas no coinciden");
      return;
    }

    try {
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

      await updateUser(authUser!._id, dataToUpdate);
      message.success("Información actualizada correctamente");
      setIsModalOpen(false);
    } catch (error) {
      message.error("Error al actualizar los datos: " + error);
    }
  };

  return (
    <div style={dashboardStyle.mainSector}>
      <h1 style={dashboardStyle.titleH2}>Mi Perfil</h1>

      <Card style={{ maxWidth: 600, margin: "0 auto", marginBottom: 24 }}>
        <p><strong>Nombre:</strong> {formData.name}</p>
        <p><strong>Correo:</strong> {formData.email}</p>
        <p><strong>Documento:</strong> {formData.documento}</p>
        <p><strong>Edad:</strong> {formData.age}</p>
        <p><strong>Grado:</strong> {formData.grade}</p>
        <p><strong>Tag:</strong> {formData.tag}</p>

        <Button
          type="primary"
          onClick={() => setIsModalOpen(true)}
          disabled={userLoading || !authUser}
        >
          Editar Información
        </Button>
      </Card>

      <Modal
        title="Actualizar Perfil"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="submit" type="primary" onClick={handleSubmit} loading={loading}>
            Guardar
          </Button>,
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>,
        ]}
      >
        <FormUser
          authUserTag={authUser?.tag || ""}
          formData={formData}
          setFormData={setFormData}
          isEditing={true}
        />
      </Modal>
    </div>
  );
};
