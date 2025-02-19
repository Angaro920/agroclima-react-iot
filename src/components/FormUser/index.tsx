import { Form, Input, InputNumber, Select, TreeSelect } from "antd";
import type { UserType } from "../../types";

interface FormAddUsersProps {
  formData: UserType;
  setFormData: React.Dispatch<React.SetStateAction<UserType>>;
}

export const FormUser = ({ formData, setFormData }: FormAddUsersProps) => {
  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(`El campo ${event.target.name} a ${event.target.value}`);
  };

  const updateFields = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    console.log(`El campo ${name} a ${value}`);
  };

  return (
    <Form
      name="AgregarUsuarios"
      autoComplete="off"
      layout="horizontal"
      variant="filled"
      size="small"
      initialValues={formData} // Asignar valores iniciales al formulario
    >
      <Form.Item<UserType>
        label="Usuario"
        rules={[
          {
            required: true,
            message: "Por favor escribe un nombre de usuario!",
          },
        ]}
      >
        <Input
          value={formData.userName}
          onChange={handleFieldChange}
          name="userName"
        />
      </Form.Item>
      <Form.Item
        label="Contraseña"
        rules={[{ required: true, message: "Por favor digite la contraseña" }]}
      >
        <Input.Password
          value={formData.password}
          onChange={handleFieldChange}
          name="password"
        />
      </Form.Item>
      <Form.Item
        label="Confirmar Contraseña"
        rules={[
          { required: true, message: "Por favor confirme la contraseña!" },
        ]}
      >
        <Input.Password
          value={formData.confirmPassword}
          onChange={handleFieldChange}
          name="confirmPassword"
        />
      </Form.Item>
      <Form.Item<UserType>
        label="Nombre"
        rules={[{ required: true, message: "Por favor escribe el nombre!" }]}
      >
        <Input value={formData.name} onChange={handleFieldChange} name="name" />
      </Form.Item>
      <Form.Item<UserType>
        label="Apellido"
        rules={[{ required: true, message: "Por favor escribe el apellido!" }]}
      >
        <Input
          value={formData.lastName}
          onChange={handleFieldChange}
          name="lastName"
        />
      </Form.Item>
      <Form.Item<UserType>
        label="Edad"
        rules={[{ required: true, message: "Por favor escriba la edad" }]}
      >
        <InputNumber
          value={formData.age}
          onChange={(newAge) => {
            updateFields("age", newAge?.toString() || "");
          }}
          name="age"
        />
      </Form.Item>
      <Form.Item
        label="Grado"
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
                { title: "Sexto",value: "Sexto" },
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
          value={formData.grade}
          onChange={(selectedValue) => {
            updateFields("grade", selectedValue);
          }}
        />
      </Form.Item>
      <Form.Item label="Tipo" name={"tag"} rules={[{ required: true }]}>
        <Select
          options={[
            { value: "estudiante", label: "Estudiante" },
            { value: "docente", label: "Docente" },
            { value: "administrativo", label: "Administrativo" },
            { value: "soporte", label: "Soporte" },
            { value: "administrador", label: "Administrador Sistema" },
          ]}
          value={formData.type}
          onChange={(selectedValue) => {
            updateFields("tag", selectedValue);
          }}
        />
      </Form.Item>
    </Form>
  );
};
