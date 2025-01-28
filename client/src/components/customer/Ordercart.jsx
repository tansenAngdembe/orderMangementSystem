import {X,Minus,Plus} from "lucide-react"
const Ordercart = ({isOpen,onClose,items,setSelected})=>{

const updateQuantity = (itemId, operation)=>{
  //working

}  
const handleCheckout = ()=>{
  console.log("Check out")
}


const total = items.reduce((sum,{price,quantity})=> sum + price * quantity,0);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button onClick={onClose}>
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
  
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    )
}

export default Ordercart;