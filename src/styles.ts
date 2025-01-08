import { CSSProperties } from "react";
import { theme } from "antd";

const {
  token: { colorBgContainer, borderRadiusLG },
} = theme.useToken();

export const siderStyle: CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

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
