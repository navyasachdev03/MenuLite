import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrashAlt } from 'react-icons/fa';

const AddItemModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ingredients: '',
    category: '',
    price: '',
  });

  const [images, setImages] = useState([]);
  const MAX_IMAGES = 5;

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    if (images.length + newFiles.length > MAX_IMAGES) {
      alert(`You can upload a maximum of ${MAX_IMAGES} images.`);
      return;
    }
    setImages([...images, ...newFiles]);
  };

  const handleFileRemove = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.ingredients || !formData.category || !formData.price) {
      alert('Please fill all required fields!');
      return;
    }

    if(images.length==0){
        alert('Please upload image(s)');
        return;
    }
    onSubmit(formData, images);
    onClose();
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full relative"
        onClick={(e) => e.stopPropagation()}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <button
          className="absolute top-4 right-4 text-xl font-bold text-gray-700 hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Add New Menu Item</h2>

        <div className="overflow-y-auto max-h-[80vh] px-4 py-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="block font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Item Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Ingredients</label>
              <input
                type="text"
                name="ingredients"
                placeholder="Ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                placeholder="Item Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
              ></textarea>
            </div>

            <div>
              <label className="block font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {['Drinks', 'Dessert', 'Appetizers', 'Main Course', 'Salads', 'Breakfast'].map(
                  (type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-medium text-gray-700">Upload Images</label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full mt-2 p-2 border rounded"
                accept="image/*"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {images.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Car"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                      onClick={() => handleFileRemove(index)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Add Item
          </button>
        </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddItemModal;