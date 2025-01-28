import { getItems } from "../../api"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const MenuItems = () => {
    const [datafromServer, setDatafromServer] = useState([])
    useEffect(() => {
        getItems("items").then((result) => {
            setDatafromServer(result)
        })
    }, [])
    // console.log(datafromServer)
    const navigate = useNavigate();
    return (
        <>
            <div>
                <input type="search" placeholder="Search items" />
            </div>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {datafromServer.map(item => (
                            <div
                                key={item._id}
                                onClick={() => navigate(`/admin/menu/${item._id}`)}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                            >
                                {
                                    item.image.map(img => (
                                        <img className="w-full h-48 object-cover" src={img} alt={img._id} />
                                    ))
                                }
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                                        <span className="text-lg font-bold text-emerald-600">
                                            ${item.price.toFixed(2)}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>


        </>
    )

}

export default MenuItems;