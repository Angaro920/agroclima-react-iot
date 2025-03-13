import { DatePicker, Form, Radio, Select } from "antd";

const { RangePicker } = DatePicker;

export const FormReport = () => {
  return (
    <Form>
      <Form.Item label="Seleccione la variable:">
        <Select
          defaultValue="Seleccione:"
          options={[
            { value: "Temperatura", label: "Temperatura" },
            { value: "Humedad", label: "Humedad" },
            { value: "Luminosidad", label: "Luminosidad" },
            { value: "Gas", label: "Gas" },
          ]}
        />
      </Form.Item>
      <Form.Item label="Seleccione el rango de fechas:">
        <RangePicker
          onChange={(dates, dateStrings) => {
            console.log("dates", dates);
            console.log("dateStrings", dateStrings);
          }}
        />
      </Form.Item>
      <Form.Item label="Seleccione tipo de archivo:">
        <Radio.Group
          block
          options={[
            { label: "PDF", value: "PDF" },
            { label: "Excel", value: "Excel" },
            { label: "CSV", value: "CSV" },
          ]}
        />
      </Form.Item>
    </Form>
  );
};
