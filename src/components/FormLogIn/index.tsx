import { Form, Input, message, Modal } from "antd";
import { useAuth } from "../../hooks/useAuth";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./styles.css";
import { useEffect, useState } from "react";
export const Login = () => {
  const { login, error, forgotPass, loading} = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      values.documento = String(values.documento || '');
      await forgotPass(values);
    } catch (err) {
      
      message.error(error  || "Usuario no encontrado");
    }
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish = async (values: { documento: string; password: string }) => {
    try {
      await login(values.documento, values.password);
      message.success("Inicio de sesión exitoso");
    } catch (err) {
      message.error(error || "Credenciales inválidas" + err);
    }
  };

  return (
    <div className="loginContainer">
      <form
        className="loginForm"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          onFinish({
            documento: form.documento.value,
            password: form.password.value,
          });
        }}
      >
        <div className="wrapper">
          <div className="loginBox">
            <div className="loginHeader">
              <span>Login</span>
            </div>
            <div className="inputBox">
              <input
                type="text"
                id="documento"
                className="inputField"
                required
              />
              <label htmlFor="documento" className="label">
                No. Documento
              </label>
              <i className="icon">
                <UserOutlined />
              </i>
            </div>
            <div className="inputBox">
              <input
                type="password"
                id="password"
                className="inputField"
                required
              />
              <label htmlFor="password" className="label">
                Contraseña
              </label>
              <i className="icon">
                <LockOutlined />
              </i>
            </div>
            <div className="rememberForgot">
              <div className="rememberMe">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember"> Recuerdame</label>
              </div>
              <div className="forgot">
                <a onClick={showModal} href="#">
                  Olvide mi contraseña!
                </a>
              </div>
            </div>
            <input
              type="submit"
              className="inputSubmit"
              value="Iniciar sesion"
            />
          </div>
        </div>
      </form>
      <Modal
        title="Recuperar contraseña"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <div style={{marginBottom:10}}> 
        Por favor, digite su numero de identificacion registrado en la plataforma
        </div>
        <Form
          form={form}
          name="Recuperar Contraseña"
          autoComplete="off"
          layout="horizontal"
          variant="filled"
        >
          <Form.Item
            label="No. Documento"
            name="documento"
            rules={[
              {
                required: true,
                message: "Por favor digite el numero de identificacion",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
