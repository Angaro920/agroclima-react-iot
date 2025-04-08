// RosaVientos.jsx
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const DIRECTIONS = [
  { name: 'N', angle: 0 },
  { name: 'NE', angle: 45 },
  { name: 'E', angle: 90 },
  { name: 'SE', angle: 135 },
  { name: 'S', angle: 180 },
  { name: 'SO', angle: 225 },
  { name: 'O', angle: 270 },
  { name: 'NO', angle: 315 },
];

const COLORS = ['#f5f5f5', '#e0e0e0']; // colores alternados

export const RosaVientos = ({ direccion = 0 }) => {
  // Para el pie chart, generamos 8 sectores iguales
  const data = new Array(8).fill({ value: 1 });

  return (
    <div style={{ width: '300px', height: '300px', position: 'relative', margin: 'auto' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            startAngle={90}
            endAngle={-270}
            innerRadius="30%"
            outerRadius="80%"
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Flecha */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '4px',
          height: '80px',
          backgroundColor: 'red',
          transform: `translate(-50%, -100%) rotate(${direccion}deg)`,
          transformOrigin: '50% 100%',
          borderRadius: '2px',
        }}
      >
        {/* Cabeza de flecha */}
        <div
          style={{
            position: 'absolute',
            top: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderBottom: '10px solid red',
          }}
        />
      </div>

      {/* Direcciones */}
      {DIRECTIONS.map((dir, index) => {
        const rad = (dir.angle - 90) * (Math.PI / 180);
        const radius = 110; // distancia del centro
        const x = Math.cos(rad) * radius + 150; // 150 es la mitad del contenedor
        const y = Math.sin(rad) * radius + 150;

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: y,
              left: x,
              transform: 'translate(-50%, -50%)',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            {dir.name}
          </div>
        );
      })}
    </div>
  );
};

export default RosaVientos;
