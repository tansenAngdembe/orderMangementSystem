import { useState } from "react";
import { putItems } from "../../api";

import { ImagePlus, X } from "lucide-react";


const InsertItems = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        description: '',
        image:null,
        category: ''
    });

    const handleImageChange =async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setFormData({...formData,image:base64});
        // if (!files) return; 
        Array.from(selectedImages).map((file) =>  setSelectedImages([...selectedImages ,{id:crypto.randomUUID(), url  : URL.createObjectURL(file)}])) 
    }


    const removeImage = (id) => {
        setSelectedImages(selectedImages.filter((image) => image.id !== id));
    }
    const handleSubmit = (e) => {
        e.preventDefault()      

        putItems("insert", formData); // sending data to api
        // if(!formData.files) alert("Please upload images.")
        setFormData({ name: "", price: "", description: "", image: null, category: "" }) // set form to empty
        setSelectedImages([]);


    }

    return (
        <div className="  flex items-center justify-center">
            <div className="bg-white rounded-lg p-6  w-full">

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            placeholder="Enter the name of Menu..."
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="px-4 py-4 border-2 border-black-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            placeholder="Enter the fixed price of Menu..."
                            type="number"
                            required
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                            className="px-4 py-4 border-2 border-black-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            required
                            placeholder="Write short description about the Menu..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="px-4 py-4 border-2 border-black-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            required
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="px-4 py-4 border-2 border-black-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="">Select a category</option>
                            <option value="Pizza">Pizza</option>
                            <option value="Mains">Mains</option>
                            <option value="Salads">Salads</option>
                            <option value="Desserts">Desserts</option>
                        </select>
                    </div>


                    <div className="px-4 py-4 border-2 border-black-500">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                            Image Upload
                        </h1>
                        <div className="space-y-2">
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                
                                    <div
                                        key={formData.name}
                                        className="relative aspect-square rounded-lg overflow-hidden group"
                                    >
                                        <img
                                            src={formData.image}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            onClick={() => removeImage(selectedImages.id)}
                                            className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                              


                                <label htmlFor="img-up" className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <input
                                        id="img-up"
                                        placeholder="Upload the image of Menu..."
                                        type="file"
                                        name="img-file"
                                        multiple
                                        onChange={handleImageChange}
                                        className="opacity-0"
                                        required
                                    />
                                    <ImagePlus className="w-8 h-8 text-gray-400" />
                                    <span className="mt-2 text-sm text-gray-500">Add Images</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                    >
                        Add Item
                    </button>

                </form>

            </div>
        </div>
    );
}

function convertToBase64 (file){
    return new Promise((resolve, reject)=>{
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = ()=>{
            resolve(fileReader.result);
        }
        fileReader.onerror = (error)=>{
            reject(error)
        }

    })
}









export default InsertItems;
