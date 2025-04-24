import { Form, Input, InputNumber, Select, TreeSelect } from "antd";
import type { UserType } from "../../types";
import { useEffect } from "react";

interface FormAddUsersProps {
  formData: UserType;
  setFormData: React.Dispatch<React.SetStateAction<UserType>>;
}

export const FormUser = ({ formData, setFormData }: FormAddUsersProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);

  const handleValuesChange = (changedValues: any, allValues: any) => {
    setFormData(allValues);
  };

  return (
    <Form
      form={form}
      name="AgregarUsuarios"
      autoComplete="off"
      layout="horizontal"
      variant="filled"
      size="small"
      initialValues={formData}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label="Usuario"
        name="userName"
        rules={[
          {
            required: true,
            message: "Por favor escribe un nombre de usuario!",
          },
        ]}
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
        rules={[
          { required: true, message: "Por favor confirme la contraseña!" },
        ]}
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
        rules={[{ required: true, message: "Por favor escribe un correo valido!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Edad"
        name="age"
        rules={[{ required: true, message: "Por favor escriba la edad" }]}
      >
        <InputNumber />
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
        rules={[{ required: true }]}
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
