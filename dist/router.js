"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const products_1 = require("./handlers/products");
const middleware_1 = require("./middleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The product name
 *                      example: Monitor Curvo
 *                  price:
 *                      type: number
 *                      description: The product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The product availability
 *                      example: true
 *
 */
/**
 * @swagger
 * /api/products:
 *  get:
 *      summary: Get a list of products
 *      tags:
 *          - Products
 *      description: Return a list of products
 *      responses:
 *          200:
 *              description: Succesful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 *
 *
 */
router.get('/', products_1.getProducts);
router.get('/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no valido'), middleware_1.handleInputErrors, products_1.getProductById);
router.post('/', //validacion
(0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre del producto no puede ir vacio'), (0, express_validator_1.body)('price')
    .isNumeric().withMessage('Valor no valido')
    .notEmpty().withMessage('El precio del producto no puede ir vacio')
    .custom(value => value > 0).withMessage('Precio no valido'), middleware_1.handleInputErrors, products_1.createProduct);
router.put('/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no valido'), (0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre del producto no puede ir vacio'), (0, express_validator_1.body)('price')
    .isNumeric().withMessage('Valor no valido')
    .notEmpty().withMessage('El precio del producto no puede ir vacio')
    .custom(value => value > 0).withMessage('Precio no valido'), (0, express_validator_1.body)('availability').isBoolean().withMessage('Valor para disponibilidad no valido'), middleware_1.handleInputErrors, products_1.updateProduct);
router.patch('/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no valido'), middleware_1.handleInputErrors, products_1.updateAvailability);
router.delete('/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no valido'), middleware_1.handleInputErrors, products_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=router.js.map