import { ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getItems } from "../../api"
import Ordercart from './Ordercart';


const Menu = () => {
    const [items, setItems] = useState([])
    const [selectedId, setSelectedId] = useState([])
    const [isOrderOpen, setIsOrderOpen] = useState(false)
    const [text, setText] = useState("Add to order!");

    useEffect(() => {
        getItems("items").then((result) => {
            setItems(result)
        })
    }, [])
    const addToOrder = (item) => {
        //    setSelectedId([...selectedId,item])
        const isExistingItems = selectedId.find(itemsId => itemsId._id === item._id)
        if (isExistingItems) {
            setSelectedId(selectedId.map(cartItems =>
                cartItems._id === item._id ? { ...cartItems, quantity: cartItems.quantity + 1 } : cartItems

            ))
        } else {
            setSelectedId([...selectedId, { item, quantity: 1 }])
        }
    }
    console.log(selectedId)
    return (
        <div className="space-y-6 m-3 p-3">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Menu</h1>
                <button
                    onClick={() => setIsCartOpen(true)}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    ({selectedId.reduce((acc, item) => acc + item.quantity, 0)})

                    My Order
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {items.map((item) => (
                    <div key={item._id} className="bg-white p-4 rounded-lg shadow-sm border-2">
                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md" />
                        <h3 className="mt-2 text-lg font-medium">{item.name}</h3>
                        <p className="text-gray-500">{item.description}</p>
                        <div className="mt-2 flex justify-between items-center">
                            <p className="text-xl font-bold">${item.price}</p>
                            <button
                                onClick={() => addToOrder(item)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Add to Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Ordercart
                isOpen={isOrderOpen}
                onClose={() => setIsOrderOpen(false)}
                items={selectedId}
                setSelected={setSelectedId}



            />

        </div>


    )
}

export default Menu;
