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
    marginTop: 16,
  },
  mainSector:{
    marginTop: 16,
    padding: 24,
    minHeight: 360,
    background: "white",
    borderRadius: "10px",
    backgroundColor: "#F9FAFB",
    fontFamily:""
  },
  chartdiv:{
    height: "300px",
    width: "auto",
    marginTop: 20,
    border: "2px solid #f0f0f0",
    borderRadius: "10px",
  },
  logo:{
    width: 70,
    alignItems: "center",
    alignContent: "center",
    display: "flex",
    margin: "auto",
    marginTop: 16,
  }
}

