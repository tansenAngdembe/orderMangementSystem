import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = [
    { name: 'Mon', orders: 12 },
    { name: 'Tue', orders: 18 },
    { name: 'Wed', orders: 14 },
    { name: 'Thu', orders: 22 },
    { name: 'Fri', orders: 28 },
    { name: 'Sat', orders: 32 },
    { name: 'Sun', orders: 24 }, 
  ];
const OrderChart = () =>{
 return (
    <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Line type="monotone" dataKey="orders" stroke="#4F46E5" />
        </LineChart>

    </ResponsiveContainer>
 )

}  
export default OrderChart