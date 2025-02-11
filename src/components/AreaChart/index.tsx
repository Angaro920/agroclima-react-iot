import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MongoObject } from '../../contexts/DataContext';

interface LineChartComponentProps {
  data: MongoObject[];
}
export const AreaChartComponent = ({data}: LineChartComponentProps) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" name='Tiempo' />
          <YAxis name='Humedad'/>
          <Tooltip />
          <Area name="Humedad" type="monotone" dataKey="data" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>)
}