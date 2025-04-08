import { useState } from "react";
import { DatePicker, Form, Radio, Select, Button, message } from "antd";
import moment from "moment";
import { BACKEND_URL } from "../../constants/urls";

const { RangePicker } = DatePicker;

interface values {
  variable: string;
  dateRange: [moment.Moment, moment.Moment];
  fileType: string;
}


export const FormReport = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: values) => {
    const { variable, dateRange, fileType } = values;

    if (!variable || !dateRange || dateRange.length !== 2) {
      message.error("Por favor, complete todos los campos.");
      return;
    }

    const tipoReporte = fileType;
    const Variable = variable;
    const startDate = dateRange[0].format("YYYY-MM-DD");
    const endDate = dateRange[1].format("YYYY-MM-DD");

    const url = BACKEND_URL+`/api/${tipoReporte}/${Variable}?startDate=${startDate}T00:00:00.000Z&endDate=${endDate}T23:59:59.999Z`;

    console.log("Realizando petición a:", url);
    setLoading(true);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      // Obtener archivo como blob (binario)
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      // Definir el nombre del archivo y descargarlo
      link.href = downloadUrl;
      link.download = `Reporte_${Variable}_${startDate}_to_${endDate}.${tipoReporte.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      message.success("Archivo descargado correctamente.");
    } catch (error) {
      console.error("Error en la petición:", error);
      message.error("Error al obtener el archivo.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="variable" label="Seleccione la variable:" rules={[{ required: true, message: "Seleccione una variable" }]}>
        <Select
          placeholder="Seleccione:"
          options={[
            { value: "Temperatura", label: "Temperatura" },
            { value: "Humedad", label: "Humedad" },
            { value: "Luz", label: "Luminosidad" },
            { value: "Hidrogeno", label: "Gas" },
            { value: "Uv", label: "Radiación UV" },
            { value: "RadiacionSolar", label: "Radiación Solar" },
            { value: "Precipitaciones", label: "Precipitaciones" },
            { value: "PresionBarometricaRelativa", label: "Presión Atmosférica Relativa" },
            { value: "TemperaturaExterna", label: "Temperatura Externa" },
            { value: "HumedadExterna", label: "Humedad Externa" },
            { value: "TemperaturaInterna", label: "Temperatura Interna" },
            { value: "HumedadInterna", label: "Humedad Interna" },
          ]}
        />
      </Form.Item>

      <Form.Item name="dateRange" label="Seleccione el rango de fechas:" rules={[{ required: true, message: "Seleccione un rango de fechas" }]}>
        <RangePicker />
      </Form.Item>

      <Form.Item name="fileType" label="Seleccione tipo de archivo:" rules={[{ required: true, message: "Seleccione un tipo de archivo" }]}>
        <Radio.Group
          options={[
            { label: "PDF", value: "pdf" },
            { label: "Excel", value: "xlsx" },
            { label: "CSV", value: "csv" },
          ]}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Generar Reporte
        </Button>
      </Form.Item>
    </Form>
  );
};
