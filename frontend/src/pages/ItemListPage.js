import React, { useEffect, useState } from 'react';
import ItemListCarousel from '../components/ItemCarousel';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AddItemModal from '../components/AddItemModal';
import { FaPlus } from 'react-icons/fa';
import { Circles } from 'react-loader-spinner';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../ApiBaseUrl';

const ItemListPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const fetchItems = async () => {
        setLoading(true);
        try {
            fetch(`${API_BASE_URL}item/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Menu items fetched:", data);
                    if (data.statusCode === 200) {
                        setItems(data.items);
                        setFilteredItems(data.items);
                    }
                })
        } catch (error) {
            console.error('Error fetching item details:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        const filtered = items.filter((item) =>
            item.category.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        setFilteredItems(filtered);
    }, [searchTerm, items]); 

    const handleAddItem = () => {
        setIsModalOpen(true);
    };

    const handleViewDetails = (item) => {
        navigate('/details', { state: { item } });
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalSubmit = async (formData, images) => {

        try {

            console.log(formData);
            console.log(images);
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('ingredients', formData.ingredients);
            formDataToSend.append('price', formData.price);

            images.forEach((file) => {
                formDataToSend.append('images', file);
            });

            await fetch(`${API_BASE_URL}item/`, {
                method: 'POST',
                body: formDataToSend,
            })
                .then(response => response.json())
                .then(data => {
                    if (data.statusCode === 201) {
                        alert('Menu Item added successfully');
                        setIsModalOpen(false);
                        fetchItems();
                    }
                    else {
                        console.error('Adding item failed:', data.message);
                        alert('Error Adding Item');
                    }
                })
                .catch(error => console.error('Error adding Item:', error));
        } catch (error) {
            console.error('Error creating Item:', error);
            alert('Error adding Menu Item');
        }

    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar setSearchTerm={setSearchTerm} />
            <h1 className="text-2xl font-semibold text-center mb-6 p-10">
                Menu Items
            </h1>
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <Circles
                        height="80"
                        width="80"
                        ariaLabel="circles-loading"
                        visible={true}
                        color="#2196F3"
                    />
                </div>
            ) : filteredItems.length === 0 ? (
                <div className="text-center items-center flex flex-col min-h-screen">
                    <h2 className="text-4xl font-semibold mb-4">No Items to Show!</h2>
                    <button
                        onClick={handleAddItem}
                        className="flex items-center justify-center bg-blue-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-600 transition"
                    >
                        <FaPlus className="mr-2" />
                        Add Menu Item
                    </button>
                </div>
            ) : (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <ItemListCarousel items={filteredItems} handleViewDetails={handleViewDetails} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleAddItem}
                                className="flex items-center justify-center bg-blue-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-600 transition mb-10"
                            >
                                <FaPlus className="mr-2" />
                                Add Menu Item
                            </button>
                        </div>
                    </motion.div>

                </>
            )}

            <AddItemModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
            />

            <Footer />
        </div>
    );
};

export default ItemListPage;