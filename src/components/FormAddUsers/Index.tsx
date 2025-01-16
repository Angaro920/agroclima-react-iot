import { Form, Input, InputNumber, Select, TreeSelect } from "antd";
type FieldType = {
  userName?: string;
  password?: string;
  name?: string;
  lastName?: string;
  age?: number;
  grade?: string;
  type?: string;
};

interface FormAddUsersProps {
  formData: FieldType;
  setFormData: React.Dispatch<React.SetStateAction<FieldType>>;
}

export const FormAddUsers = ({ formData, setFormData }: FormAddUsersProps) => {
  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(`El campo ${event.target.name} a ${event.target.value}` )
  }
  const updateFields = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    console.log(`El campo ${name} a ${value}`)
  }; 

  return (
    <Form
      name="AgregarUsuarios"
      autoComplete="off"
      layout="horizontal"
      variant="filled"
      size="small"
    >
      <Form.Item<FieldType>
        label="Usuario"
        rules={[
          {
            required: true,
            message: "Por favor escribe un nombre de usuario!",
          },
        ]}
      >
        <Input value={formData.userName} onChange={handleFieldChange} name="userName"/>
      </Form.Item>
      <Form.Item
        label="Contraseña"
        name="password"
        rules={[{ required: true, message: "Por favor digite la contraseña" }]}
      >
        <Input.Password ></Input.Password>
      </Form.Item>
      <Form.Item
        label="Confirmar Contraseña"
        name="confirmPass"
        rules={[
          { required: true, message: "Por favor confirme la contraseña!" },
        ]}
      >
        <Input.Password value={formData.password} onChange={handleFieldChange} name="password" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Nombre"
        name="name"
        rules={[{ required: true, message: "Por favor escribe el nombre!" }]}
      >
        <Input value={formData.name} onChange={handleFieldChange} name="name"/>
      </Form.Item>
      <Form.Item<FieldType>
        label="Apellido"
        name="lastName"
        rules={[{ required: true, message: "Por favor escribe el apellido!" }]}
      >
        <Input value={formData.lastName} onChange={handleFieldChange} name="lastName" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Edad"
        name="age"
        rules={[{ required: true, message: "Por favor escriba la edad" }]}
      >
        <InputNumber value={formData.age} onChange={(newAge)=>{
          updateFields("age",newAge?.toString() || "")
        }} name="age" />
      </Form.Item>
      <Form.Item
        label="Grado"
        rules={[{ required: true, message: "Por favor seleccione una opcion" }]}
        name="grade"
      >
        <TreeSelect
          treeData={[
            {
              title: "Primaria",
              value: "Primaria",
              children: [
                { title: "Primero", value: "1" },
                { title: "Segundo", value: "2" },
                { title: "Tercero", value: "3" },
                { title: "Cuarto", value: "4" },
                { title: "Quinto", value: "5" },
              ],
            },
            {
              title: "Secundaria",
              value: "Secundaria",
              children: [
                { title: "Sexto", value: "6" },
                { title: "Septimo", value: "7" },
                { title: "Octavo", value: "8" },
                { title: "Noveno", value: "9" },
                { title: "Decimo", value: "10" },
                { title: "Once", value: "11" },
              ],
            },
            {
              title: "No aplica",
              value: "N/A",
            },
          ]}
          value={formData.grade} onChange={(selectedValue)=>{
             updateFields("grade",selectedValue) 
          }}/>
      </Form.Item>
      <Form.Item label="Tipo" name="Type" rules={[{ required: true }]}>
        <Select
          /* defaultValue="Seleccione" */
          options={[
            { value: "estudiante", label: "Estudiante" },
            { value: "administrativo", label: "Administrativo" },
            { value: "soporte", label: "Soporte" },
            { value: "adminitrsador", label: "Administrador Sistema" },
          ]}
          value={formData.type} onChange={(selectedValue) => {
            updateFields("tag",selectedValue)
          }}/>
      </Form.Item>
    </Form>
  );
};
