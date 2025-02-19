import { useParams } from "react-router-dom";
import { Provider } from "../../context/contextProvider";
import { Clock } from "lucide-react";
import { updateStatus } from "../../api";
export const Manageorder = () => {
    const { id } = useParams();
    const { state, navigation, dispatch } = Provider();
    // console.log(state.order_data.filter(val => val._id === id))
    const order = state.order_data.filter(val => val._id === id)
    // console.log(order.map(val => typeof(val.time)))
    console.log(order)
    const back = () => {
        navigation("admin/orders")
    }
    const onUpdateStatus=(id, status)=>{
        try {
            dispatch({type:"STATUS-UPDATE", payload: status } )
            updateStatus("order", id,state)
            
        } catch (error) {
            console.log(error)
        }


    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold cursor-pointer" onClick={back}>Back To Order Queue</h1>
            <div className="bg-white p-6 rounded-lg shadow-sm" key={id}>
                {order.map(val => (
                    <>

                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Order #{id}</h3>
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

                        <div className="mt-4 flex justify-between items-center">
                            <span className="font-bold">Total: ${val.price.toFixed(2)}</span>
                            {val.state === 'pending' && (
                                <button
                                    onClick={() => onUpdateStatus(val._id, 'completed')}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Mark as Completed
                                </button>
                            )}
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}





