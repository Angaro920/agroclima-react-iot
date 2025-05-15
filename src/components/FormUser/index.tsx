import { Form, Input, InputNumber, Select, TreeSelect } from "antd";
import type { UserType } from "../../types";
import { useEffect } from "react";

interface FormAddUsersProps {
  formData: UserType;
  setFormData: React.Dispatch<React.SetStateAction<UserType>>;
  isEditing?: boolean;
}

export const FormUser = ({ formData, setFormData, isEditing = false }: FormAddUsersProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    // Actualizar los campos del formulario cuando cambia formData
    if (formData) {
      form.setFieldsValue(formData);
    }
  }, [formData, form]);

  const handleValuesChange = (changedValues: any, allValues: any) => {
    // Actualizar el estado con los nuevos valores
    setFormData(allValues);
  };

  return (
    <Form
      form={form}
      name="UserForm"
      autoComplete="off"
      layout="horizontal"
      variant="filled"
      initialValues={formData}
      onValuesChange={handleValuesChange}
      preserve={false} // No preservar valores al desmontar
    >
      <Form.Item
        label="Documento"
        name="documento"
        rules={[{ required: true, message: "Por favor escribe el documento de identidad!" }]}
      >
        <Input />
      </Form.Item>
      
      {/* Campo userName oculto en la interfaz pero presente en el modelo */}
      <Form.Item
        name="userName"
        hidden={true}
      >
        <Input />
      </Form.Item>
      
      <Form.Item
        label="Contraseña"
        name="password"
        rules={[{ 
          required: !isEditing, 
          message: "Por favor digite la contraseña" 
        }]}
      >
        <Input.Password placeholder={isEditing ? "Dejar en blanco para mantener la contraseña actual" : ""} />
      </Form.Item>
      
      <Form.Item
        label="Confirmar Contraseña"
        name="confirmPassword"
        rules={[
          { 
            required: !isEditing, 
            message: "Por favor confirme la contraseña!" 
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('¡Las contraseñas no coinciden!'));
            },
          }),
        ]}
      >
        <Input.Password placeholder={isEditing ? "Dejar en blanco para mantener la contraseña actual" : ""} />
      </Form.Item>
      
      <Form.Item
        label="Nombre"
        name="name"
        rules={[{ required: true, message: "Por favor escribe el nombre!" }]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item
        label="Correo"
        name="email"
        rules={[
          { required: true, message: "Por favor escribe un correo" },
          { type: 'email', message: 'Por favor ingresa un correo válido!' }
        ]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item
        label="Edad"
        name="age"
        rules={[{ required: true, message: "Por favor escriba la edad" }]}
      >
        <InputNumber min={0} max={120} />
      </Form.Item>
      
      <Form.Item
        label="Grado"
        name="grade"
        rules={[{ required: true, message: "Por favor seleccione una opcion" }]}
      >
        <TreeSelect
          treeData={[
            {
              title: "Primaria",
              value: "Primaria",
              children: [
                { title: "Primero", value: "Primero" },
                { title: "Segundo", value: "Segundo" },
                { title: "Tercero", value: "Tercero" },
                { title: "Cuarto", value: "Cuarto" },
                { title: "Quinto", value: "Quinto" },
              ],
            },
            {
              title: "Secundaria",
              value: "Secundaria",
              children: [
                { title: "Sexto", value: "Sexto" },
                { title: "Septimo", value: "Septimo" },
                { title: "Octavo", value: "Octavo" },
                { title: "Noveno", value: "Noveno" },
                { title: "Decimo", value: "Decimo" },
                { title: "Once", value: "Once" },
              ],
            },
            {
              title: "No aplica",
              value: "No aplica",
            },
          ]}
        />
      </Form.Item>
      
      <Form.Item 
        label="Tipo" 
        name="tag" 
        rules={[{ required: true, message: "Por favor seleccione un tipo de usuario" }]}
      >
        <Select
          options={[
            { value: "estudiante", label: "Estudiante" },
            { value: "docente", label: "Docente" },
            { value: "administrador", label: "Administrador" },
          ]}
        />
      </Form.Item>
    </Form>
  );
};