export interface SensorData {
    _id: string;
    data: number;
    time: string;
  }
  
  export interface LastDataType {
    TemperaturaInterna: SensorData;
    TemperaturaExterna: SensorData;
    TemperaturaSensor: SensorData;
    HumedadSensor: SensorData;
    HumedadInterna: SensorData;
    HumedadExterna: SensorData;
    RadiacionSolar: SensorData;
    Precipitaciones: SensorData;
    PresionBarometricaRelativa: SensorData;
    Uv: SensorData;
    LuzSensor: SensorData;
    HidrogenoSensor: SensorData;
    DireccionViento: SensorData;
    VelocidadViento: SensorData;    
  }