import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../ApiBaseUrl';

const ItemDetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const item = location.state?.item;

    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState({ ...item });
    const [selectedImage, setSelectedImage] = useState(item.images[0]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const handleInputChange = (field, value) => {
        setEditedItem((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleImageDelete = () => {
        const updatedImages = editedItem.images.filter((img) => img !== selectedImage);
        setEditedItem((prev) => ({
            ...prev,
            images: updatedImages,
        }));
        if (updatedImages.length > 0) setSelectedImage(updatedImages[0]);
    };

    const handleAddImage = (event) => {
        const file = event.target.files[0];
    
        if (!file) return;
    
        const reader = new FileReader();
        reader.onload = () => {
            setEditedItem((prev) => ({
                ...prev,
                images: [...prev.images, reader.result],
            }));
        };
    
        reader.readAsDataURL(file);
    };

    const handleSaveEdit = async () => {

        console.log(editedItem);
        try {
            const response = await fetch(`${API_BASE_URL}item/${item._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedItem),
            });

            if (response.ok) {
                const updatedItem = await response.json();
                setIsEditing(false);
                console.log('Item updated:', updatedItem);
            } else {
                console.error('Failed to update item');
            }
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedItem({ ...item });
    };

    const handleDeleteItem = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}item/${item._id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                console.log('Item deleted successfully');
                alert('Item deleted successfully');
                navigate('/staff-home');
            } else {
                console.error('Failed to delete item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const renderImageGrid = () => {
        const rows = [];
        const imagesPerRow = 5;
        for (let i = 0; i < editedItem.images.length; i += imagesPerRow) {
            rows.push(editedItem.images.slice(i, i + imagesPerRow));
        }
        return rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2 mb-2">
                {row.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Item Image ${index + 1}`}
                        className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-80"
                        onClick={() => setSelectedImage(image)}
                    />
                ))}
            </div>
        ));
    };

    return (
        <div className="bg-gray-100 min-h-screen text-white">
            <Navbar />
            <div className="p-10 flex flex-col lg:flex-row gap-5">
                <div className="flex-1">
                    <div className="relative mb-4">
                        <img
                            src={selectedImage}
                            alt="Selected Item"
                            className={`w-full max-w-lg mx-auto rounded-lg shadow-lg ${
                                isEditing ? 'opacity-75' : ''
                            }`}
                        />
                        {isEditing && (
                            <button
                                className="absolute top-0 right-10 text-2xl rounded-full hover:scale-110"
                                onClick={handleImageDelete}
                            >
                                ❎
                            </button>
                        )}
                    </div>
                    {renderImageGrid()}
                    {isEditing && (
                        <div className="mt-4 text-center">
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg inline-block"
                        >
                            + Add Image
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAddImage}
                        />
                    </div>
                    )}
                </div>

                <div className="flex-1 bg-transparent p-6">
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                value={editedItem.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="text-4xl font-bold mb-4 bg-gray-300 text-black p-2 rounded w-full"
                            />
                            <textarea
                                value={editedItem.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                className="text-lg text-gray-300 mb-6 bg-gray-300 text-gray-700 p-2 rounded w-full"
                                rows={4}
                            />
                        </>
                    ) : (
                        <>
                            <h1 className="text-4xl font-bold mb-4 text-black">{editedItem.name}</h1>
                            <p className="text-lg text-gray-300 mb-6 text-gray-700">{editedItem.description}</p>
                        </>
                    )}

                    <hr className="border-gray-700 mb-6" />

                    <div className="space-y-4 text-lg">
                        {['ingredients', 'category'].map(
                            (field, index) => (
                                <p className="flex items-center text-black" key={index}>
                                    <span className="mr-2">🔹</span>
                                    {field.charAt(0).toUpperCase() + field.slice(1)}:{' '}
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedItem[field]}
                                            onChange={(e) => handleInputChange(field, e.target.value)}
                                            className="ml-2 bg-gray-300 text-black p-1 rounded"
                                        />
                                    ) : (
                                        editedItem[field]
                                    )}
                                </p>
                            )
                        )}
                        <p className="text-2xl font-semibold mt-4 text-black">
                            ₹
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={editedItem.price}
                                    onChange={(e) => handleInputChange('price', e.target.value)}
                                    className="ml-2 bg-gray-300 text-black p-1 rounded"
                                />
                            ) : (
                                editedItem.price.toLocaleString()
                            )}{' '}
                            and above
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center gap-4 mt-6 pb-10">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleSaveEdit}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancelEdit}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => setShowDeleteConfirmation(true)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>

            {showDeleteConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center">
                        <p className="mb-4">Do you want to delete this menu item?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleDeleteItem}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirmation(false)}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default ItemDetailPage;