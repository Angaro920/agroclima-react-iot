import { CSSProperties } from "react";
import { theme } from "antd";

const {
  token: { colorBgContainer, borderRadiusLG },
} = theme.useToken();


export const globalLayoutStyle: CSSProperties = {
  minHeight: "100vh",
};

export const logomenu: CSSProperties = {
  background: "white",
  borderRadius: "50%",
  width: 50,
  height: 50,
  alignItems: "center",
  alignContent: "center",
  display: "flex",
  margin: "auto",
};

export const mainSector: CSSProperties = {
  marginTop: 16,
  padding: 24,
  minHeight: 360,
  background: colorBgContainer,
  borderRadius: borderRadiusLG,
};

export const headerDashboard: CSSProperties = {

}