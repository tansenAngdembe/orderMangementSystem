import React from "react";
import {BarChart as BarChartIcon, Users, DollarSign, ShoppingBag} from "lucide-react";
import {sampleOrders} from "./data/sampleOrder"
import OrderChart from "./dashboard/OrderChart"
import SalesChart from "./dashboard/SalesChart"
import { Provider } from "../../context/contextProvider";
const Dashboard = ()=>{
  const {state} = Provider();
  // console.log(state.order_data.getallorder.length)
  const totalRevenue = sampleOrders.reduce((sum, order) => 
    order.paymentStatus === 'completed' ? sum + order.totalAmount : sum, 0
  );

    const stats = [
        { 
          title: 'Total Orders', 
          value: state.total_order, 
          icon: ShoppingBag, 
          color: 'bg-blue-500' 
        },
        { 
          title: 'Total Revenue', 
          value: `Rs ${totalRevenue.toFixed(2)}`, 
          icon: DollarSign, 
          color: 'bg-green-500' 
        },
        { 
          title: 'Total Customers', 
          value: new Set(sampleOrders.map(order => order.customerName)).size, 
          icon: Users, 
          color: 'bg-purple-500' 
        },
        { 
          title: 'Pending Orders', 
          value: sampleOrders.filter(order => order.status === 'pending').length, 
          icon: BarChartIcon, 
          color: 'bg-yellow-500' 
        },
      ];

 return (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm">
            <div className={`inline-flex p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-4 text-sm font-medium text-gray-500">{stat.title}</h3>
            <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          <SalesChart />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Orders Overview</h2>
          <OrderChart />
        </div>
      </div>



    </div>
 )
}

export default Dashboard