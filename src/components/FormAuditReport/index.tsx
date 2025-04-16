import { useState } from "react";
import { DatePicker, Form, Radio, Button, message } from "antd";
import moment from "moment";
import { BACKEND_URL } from "../../constants/urls";

const { RangePicker } = DatePicker;

interface FormValues {
  dateRange: [moment.Moment, moment.Moment];
  fileType: string;
}

export const FormAuditReport = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: FormValues) => {
    const { dateRange, fileType } = values;

    if (!dateRange || dateRange.length !== 2) {
      message.error("Por favor, seleccione un rango de fechas.");
      return;
    }

    const tipoReporte = fileType;
    const startDate = dateRange[0].format("YYYY-MM-DD");
    const endDate = dateRange[1].format("YYYY-MM-DD");

    const url = `${BACKEND_URL}/api/audits/${tipoReporte}?startDate=${startDate}T00:00:00.000Z&endDate=${endDate}T23:59:59.999Z`;

    console.log("📤 Descargando auditorías desde:", url);
    setLoading(true);

    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = downloadUrl;
      link.download = `Auditoria_${startDate}_to_${endDate}.${tipoReporte}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      message.success("Archivo descargado correctamente.");
    } catch (error) {
      console.error("❌ Error al descargar auditorías:", error);
      message.error("No se pudo generar el archivo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="dateRange"
        label="Seleccione el rango de fechas:"
        rules={[{ required: true, message: "Seleccione un rango de fechas" }]}
      >
        <RangePicker />
      </Form.Item>

      <Form.Item
        name="fileType"
        label="Seleccione tipo de archivo:"
        rules={[{ required: true, message: "Seleccione un tipo de archivo" }]}
      >
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
