const laptopModel = require('../models/laptop.model');

async function findAll(req, res) {
    const laptops = await laptopModel.find();
    res.status(200).json({
        message: "Item retrieved successfully.",
        laptops
})};

async function findById(req, res) {
    const id = req.params.id;
    const laptops = await laptopModel.findById(id);
    res.status(200).json({
        message: "Item retrieved successfully.",
        laptops
    });
};

async function Create(req, res) {
    const laptop = req.body;
    await laptopModel.create(laptop);
    return res.status(200).json({ message: "Create new laptop successfully" })
};

module.exports = {
    findAll,
    findById,
    Create
};