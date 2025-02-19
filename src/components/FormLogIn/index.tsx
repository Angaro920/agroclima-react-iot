
import { message } from "antd";
import { useAuth } from "../../hooks/useAuth";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./styles.css";
export const Login = () => {
  const { login, error } = useAuth();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      await login(values.username, values.password);
      message.success("Inicio de sesión exitoso");
    } catch (err) {
      message.error(error || "Credenciales inválidas"+err);
    }
  };

  return (
    <div className="loginContainer">
      <form className="loginForm" onSubmit={(e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        onFinish({ username: form.userName.value, password: form.password.value });
      }}>
      <div className="wrapper">
        <div className="loginBox">
          <div className="loginHeader">
            <span>Login</span>
          </div>
          <div className="inputBox">
            <input type="text" id="userName" className="inputField" required/>
            <label htmlFor="userName" className="label">Usuario</label>
            <i className="icon"><UserOutlined /></i>
          </div>
          <div className="inputBox">
            <input type="password" id="password" className="inputField" required/>
            <label htmlFor="password" className="label">Contraseña</label>
            <i className="icon"><LockOutlined /></i>
          </div>
          <div className="rememberForgot">
            <div className="rememberMe">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember"> Recuerdame</label>
            </div>
            <div className="forgot">
              <a href="#">Olvide mi contraseña!</a>
            </div>
          </div>
            <input type="submit" className="inputSubmit" value="Iniciar sesion"/>
          </div>
        </div>
        </form>
      </div>
  );
};