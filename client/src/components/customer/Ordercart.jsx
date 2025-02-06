import { X, Minus, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { customerOrderList } from "../../api"
const Ordercart = ({ isOpen, onClose, items, setSelected,settext, text }) => {
  const [table_no, setTable_no] = useState('Table 1')
  const numberOfTable = [
    {value:"table1", label:"Table 1"},
    {value:"table2", label:"Table 2"},
    {value:"table3", label:"Table 3"},
    {value:"table4", label:"Table 4"}
  ]
  const updateQuantity = (itemId, operation) => {
    //working

  }
  
  const handleCheckout = async () => {
    setSelected([]) // making item empty after success order
    onClose(false)// closing the order cart after ordered
    settext({...text,state:true})
    let orderCart = items.map((items)=> ({itemId:items.item._id, quantity:items.quantity,tableNumber:table_no}))
    customerOrderList("orders",orderCart)
    // console.log(orderCart)
  }
  
  // customerOrderList("orderitems", )
  
  useEffect(() => {
    if (text.state) {
      let msg = setTimeout(() => {
        settext({state:false, value:"Order successful!"})

      }, 2000)
      return () => clearTimeout(msg);
    }

  }, [text.state])
  //total calculation 
  const total = items.reduce((sum, i) => sum + i.item.price * i.quantity, 0);
  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button onClick={() => onClose(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            {items.map(({ item, quantity }) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div>
           <label>Table No:</label>
           <select className="w-full p-2 border-2 border-gray-300 rounded-md" value={table_no} onChange={(e)=>setTable_no(e.target.value)}>
            {numberOfTable.map((table) => (
              <option key={table.value} value={table.value}>{table.label}</option>
            ))}
           
           </select>

          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
              disabled={items.length <= 0 ? true : false}
            >
              {items.length <= 0 ? "Order first" : "Checkout"}
            </button>
          </div>
        </div>
      </div>
    ))
}

export default Ordercart;