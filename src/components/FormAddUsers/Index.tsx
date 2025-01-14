import { Form, Input, InputNumber, TreeSelect } from "antd"
type FieldType = {
  username?: string;
  name?: string;
  lastName?: string;
  age?: number;
  grade?: string;
};

export const FormAddUsers = () =>{
    return(
    <Form name="AgregarUsuarios" autoComplete="off">
          <Form.Item<FieldType>
            label="Usuario"
            name="username"
            rules={[
              {
                required: true,
                message: "Por favor escribe un nombre de usuario!",
              },
            ]}
            
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Nombre"
            name="name"
            rules={[
              { required: true, message: "Por favor escribe el nombre!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Apellido"
            name="lastName"
            rules={[
              { required: true, message: "Por favor escribe el apellido!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Edad"
            name="age"
            rules={[{ required: true, message: "Por favor escriba la edad" }]}
          >
            <InputNumber />
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
                  title:"Secundaria",
                  value:"Secundaria",
                  children: [
                    { title: "Sexto", value: "6" },
                    { title: "Septimo", value: "7" },
                    { title: "Octavo", value: "8" },
                    { title: "Noveno", value: "9" },
                    { title: "Decimo", value: "10" },
                    { title: "Once", value: "11" },
                  ]
                },
                {
                  title:"Administrativo",
                  value:"Administrativo"
                },
                {
                  title:"Docente",
                  value:"Docente"
                },
                {
                  title:"Desarrollador",
                  value:"Desarrollador"
                }
              ]}
            />
          </Form.Item>
        </Form>
)}