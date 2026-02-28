"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateAvailability = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const Product_model_1 = __importDefault(require("../models/Product.model"));
const getProducts = async (req, res) => {
    try {
        const products = await Product_model_1.default.findAll({
            order: [
                ['id', 'DESC']
            ]
        });
        res.json({ data: products });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const product = await Product_model_1.default.findByPk(id);
        if (!product) {
            return res.status(404).json({
                error: 'Producto No Encontrado'
            });
        }
        res.json({ data: product });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    try {
        const product = await Product_model_1.default.create(req.body);
        res.status(201).json({ data: product });
    }
    catch (error) {
        console.log(error);
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    const id = Number(req.params.id);
    const product = await Product_model_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        });
    }
    // Actualizar
    await product.update(req.body);
    await product.save();
    res.json({ data: product });
};
exports.updateProduct = updateProduct;
const updateAvailability = async (req, res) => {
    const id = Number(req.params.id);
    const product = await Product_model_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        });
    }
    // Actualizar
    product.availability = !product.dataValues.availability;
    await product.save();
    res.json({ data: product });
};
exports.updateAvailability = updateAvailability;
const deleteProduct = async (req, res) => {
    const id = Number(req.params.id);
    const product = await Product_model_1.default.findByPk(id);
    if (!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        });
    }
    await product.destroy();
    res.json({ data: 'Producto Eliminado' });
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=products.js.map