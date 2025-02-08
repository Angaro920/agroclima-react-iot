import {FC} from "react";
import { Button, Form, Input, message } from "antd";
import { useAuth } from "../../hooks/useAuth";

const Login: FC = () => {
  const { login, loading, error } = useAuth();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      await login(values.username, values.password);
      message.success("Inicio de sesión exitoso");
    } catch (err) {
      message.error(error || "Credenciales inválidas");
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "100px auto" }}>
      <Form onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: "Ingresa tu usuario" }]}>
          <Input placeholder="Usuario" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Ingresa tu contraseña" }]}>
          <Input.Password placeholder="Contraseña" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Iniciar sesión
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;