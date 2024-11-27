const Item = require('../models/item.model.js');
const uploadOnCloudinary = require('../utils/cloudinary.js');


const handleImageUploads = async (files) => {
    const imageUrls = [];
    for (const file of files) {
      const response = await uploadOnCloudinary(file.path);
      if (response?.url) imageUrls.push(response.url);
    }
    return imageUrls;
};

const addItem = async (req, res) => {

    try {

        
        const { name, description, category, ingredients, price } = req.body;

        if (!name || !category|| !ingredients || !description || !price) {
            res.json({statusCode: 400, msg: "All fields must be provided."});
        }

        const imageUrls = await handleImageUploads(req.files);

        const newItem = new Item({
            name: name, description: description, category: category, ingredients: ingredients, price: price, images: imageUrls
        })

        const savedItem = await newItem.save();
        res.status(201).json({statusCode: 201, msg: "Menu item added successfully", item: savedItem});

    } catch (error) {
        res.json(error);
    }
};

const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json({ items: items, statusCode: 200 });
    } catch (error) {
        res.json(error);
    }
};

const getItemByCategory = async (req, res) => {
    try {
        const items = await Item.find({ category: req.params.category });

        if (!items.length) {
            return res.json({ msg: "No items found in this category" });
        }

        res.json(items);
    } catch (error) {
        res.json(error);
    }
};

const updateItem = async (req, res) => {
    try {

        const item = await Item.findById(req.params.itemId);

        if(!item){
            return res.json({msg: 'Item not found.'})
        }

        let updatedImages = item.images;
        if (req.files && req.files.length > 0) {
          updatedImages = await handleImageUploads(req.files);
        }

        const updatedItem = await Item.findByIdAndUpdate(req.params.itemId, req.body, updatedImages, { new: true } );

        res.status(200).json({statusCode: 200, updatedItem: updatedItem, msg: 'Item updated successfully'});

    } catch (error) {
        res.json(error);
    }
};

const deleteItem = async (req, res) => {
    try {

        const {itemId} = req.params;
        const deletedItem = await Item.findByIdAndDelete(itemId);

        if (!deletedItem) {
            return res.json({ msg: "No item found." });
        }

        res.status(200).json({ statusCode: 200, deletedItem: deletedItem, msg: 'Item deleted successfully'});
    } catch (error) {
        res.json(error);
    }
};

module.exports = { addItem, getAllItems, getItemByCategory, updateItem, deleteItem };