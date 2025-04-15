import { Form, Input, InputNumber, Select, TreeSelect, FormInstance } from "antd";
import { useEffect } from "react";
import type { UserType } from "../../types";

interface FormAddUsersProps {
  form: FormInstance; // ✅ Agrega esta propiedad para recibir el form

}

export const FormUser = ({ form, formData, setFormData }: FormAddUsersProps) => {
  // ✅ Sincronizar datos al abrir modal
  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);

  return (
    <Form
      form={form}
      name="AgregarUsuarios"
      autoComplete="off"
      layout="horizontal"
      variant="filled"
      size="small"
      onValuesChange={(changedValues, allValues) => {
        setFormData(allValues); // 🔄 actualiza el estado con todos los datos modificados
      }}
    >
      <Form.Item<UserType>
        label="Usuario"
        name="userName"
        rules={[{ required: true, message: "Por favor escribe un nombre de usuario!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Contraseña"
        name="password"
        rules={[{ required: true, message: "Por favor digite la contraseña" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirmar Contraseña"
        name="confirmPassword"
        rules={[{ required: true, message: "Por favor confirme la contraseña!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Documento"
        name="documento"
        rules={[{ required: true, message: "Por favor escribe el documento de identidad!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<UserType>
        label="Nombre"
        name="name"
        rules={[{ required: true, message: "Por favor escribe el nombre!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<UserType>
        label="Correo"
        name="email"
        rules={[{ required: true, message: "Por favor escribe un correo válido!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<UserType>
        label="Edad"
        name="age"
        rules={[{ required: true, message: "Por favor escribe la edad" }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Grado"
        name="grade"
        rules={[{ required: true, message: "Por favor selecciona una opción" }]}
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
        rules={[{ required: true, message: "Por favor selecciona un tipo de usuario" }]}
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
