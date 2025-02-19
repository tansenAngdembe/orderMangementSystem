import { Provider } from "../../context/contextProvider"
import {Clock} from "lucide-react"


export const Myorder = () => {
    const { state } = Provider();
    console.log(state.order_data)
    return (
        <div className=" flex-1 ml-64 p-8">
            <div className="grid grid-flow-col grid-rows-3 gap-4 ">
                {
                    state.order_data.map((val) => (
                        <div className="p-8 m-4 rounded-lg border-2 border-solid" key={val._id}>
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium">Order #{val._id}</h3>
                                <span className={`px-3 py-1 rounded-full text-sm ${val.state === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                    }`}>
                                    {val.state}
                                </span>
                            </div>

                            <div className="mt-4">
                                <div className="flex items-center text-gray-500 mb-2">
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span>{new Date(val.time).toLocaleTimeString()}</span>
                                </div>
                                <p className="font-medium">Table Number:- {val.tableNumber}</p>
                            </div>


                            <div className="mt-4 space-y-2">

                                <div key={val._id} className="flex flex-col">
                                    {val.orderList.map(val => (
                                        <div className="flex justify-between">
                                            <span>{val.name}</span>
                                            <span className="font-medium">x{val.quantity}</span>

                                        </div>

                                    ))}
                                </div>



                            </div>
                            <span className="font-bold">Total: ${val.price.toFixed(2)}</span>
                        </div>


                    ))
                }
            </div>


        </div>
    )
}