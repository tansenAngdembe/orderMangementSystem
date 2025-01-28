import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X, Edit2, Trash2 } from 'lucide-react';




import { findItems, updateItems, deleteItems } from '../../api'; // importing the putItems function from the api.js file


const MenuDetails = () => {
    const [findItem, setFindItem] = useState([]);// setting the state of the findItem   
    const [isEditing, setIsEditing] = useState(false);// setting the state of the isEditing
    const [isItemEditing, setIsItemEditing] = useState([]);// setting the state of the isItemEditing

    const { id } = useParams();// getting the id from the url
    const navigate = useNavigate();// using the navigate hook

    useEffect(() => {
        findItems("find", id).then((data) => {
            setFindItem([data])
            setIsItemEditing({ ...data })
        })
    }, [id])

    console.log(isItemEditing)

    const handleSave = () => {
        updateItems("update", id, isItemEditing).then((data) => {
            console.log(data)
            alert("Items updated successfully")
            setIsEditing(false)
        })
    }
    // delete the data
    const handleDelete = () => {
        deleteItems("delete", id).then((data) => {
            console.log(data)
            alert("Items deleted successfully")})
            navigate('/admin/menu-items')
    }



    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate('/admin/menu-items')}
                className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Menu
            </button>
            {findItem.map(item => (
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-96 object-cover"
                    />
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            {isEditing ? (
                                <div className="space-y-4 w-full">
                                    <input
                                        type="text"
                                        value={isItemEditing?.name}
                                        onChange={e => setIsItemEditing({ ...isItemEditing, name: e.target.value })}
                                        className="text-2xl font-bold w-full p-2 border rounded"
                                    />
                                    <div className="flex gap-4">
                                        <input
                                            type="number"
                                            value={isItemEditing?.price}
                                            onChange={e => setIsItemEditing({ ...isItemEditing, price: parseFloat(e.target.value) })}
                                            className="p-2 border rounded"
                                            step="0.01"
                                        />
                                        <select
                                            value={isItemEditing?.category}
                                            onChange={e => setIsItemEditing({ ...isItemEditing, category: e.target.value })}
                                            className="p-2 border rounded"
                                        >
                                            <option value="">Select a category</option>
                                            <option value="Pizza">Pizza</option>
                                            <option value="Mains">Mains</option>
                                            <option value="Salads">Salads</option>
                                            <option value="Desserts">Desserts</option>
                                        </select>
                                    </div>
                                    <textarea
                                        value={isItemEditing?.description}
                                        onChange={e => setIsItemEditing({ ...isItemEditing, description: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        rows={4}
                                    />
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{item.name}</h1>
                                        <p className="text-lg text-emerald-600 font-semibold mb-2">
                                            ${item.price.toFixed(2)}
                                        </p>
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                                            {item.category}
                                        </span>
                                    </div>
                                </>
                            )}

                            <div className="flex gap-2">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={handleSave}
                                            className="p-2 text-white bg-emerald-600 rounded-full hover:bg-emerald-700"
                                        >
                                            <Save className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="p-2 text-white bg-gray-600 rounded-full hover:bg-gray-700"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
                                        >
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            className="p-2 text-white bg-red-600 rounded-full hover:bg-red-700"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        {!isEditing && (
                            <p className="text-gray-600 leading-relaxed mt-4">{item.description}</p>
                        )}

                    </div>

                </div>
            ))}
        </div>

    )
}

export default MenuDetails;