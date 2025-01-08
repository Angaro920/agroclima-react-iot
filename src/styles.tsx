import { CSSProperties } from "react";

export const dashboardStyle: Record<string, CSSProperties> = {
  globalLayoutStyle:{
    minHeight: "100vh",
  },
  logomenu:{
    background: "#add8e6",
    borderRadius: "50%",
    width: 50,
    height: 50,
    alignItems: "center",
    alignContent: "center",
    display: "flex",
    margin: "auto",
  },
  mainSector:{
    marginTop: 16,
    padding: 24,
    minHeight: 360,
    background: "white",
    borderRadius: "10px",
  },
}
