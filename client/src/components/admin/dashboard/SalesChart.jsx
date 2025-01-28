import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', sales: 1200 },
  { name: 'Tue', sales: 1800 },
  { name: 'Wed', sales: 1400 },
  { name: 'Thu', sales: 2200 },
  { name: 'Fri', sales: 2800 },
  { name: 'Sat', sales: 3200 },
  { name: 'Sun', sales: 2400 },
];

const SalesChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="sales" fill="#4F46E5" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;