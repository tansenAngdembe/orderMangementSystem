
import { Provider } from "../../context/contextProvider"
export const Orderlayout = () => {
  const { state,navigation } = Provider()
  console.log(state.order_data)
  const manageOrder=(id)=>{
    navigation(`admin/order/${id}`)
    // console.log("mage order" + id)
  }
  return (
    <div className="space-y-6">
      

      <h1 className="text-2xl font-bold">Orders Queue</h1>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Table No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              
              </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {state.order_data.map((order) => (
              <tr key={order._id} onClick={()=>manageOrder(order._id)}>
                <td className="px-6 py-4 cursor-pointer whitespace-nowrap text-sm font-medium text-gray-900">
                  {order._id.toUpperCase()}
                </td>
                <td className="px-6 py-4 cursor-pointer whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.tableNumber}
                </td>
               
                <td className="px-6 py-4 cursor-pointer whitespace-nowrap text-sm text-gray-500">
                  ${order.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap cursor-pointer">
                  <span className={`px-2 py-1 text-xs rounded-full ${order.state === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {order.state}
                  </span>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
