import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/products";
import { handleInputErrors } from "./middleware";

const router = Router()

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


router.get('/', getProducts)

router.get('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById)

router.post('/', //validacion
    body('name')
   .notEmpty().withMessage('El nombre del producto no puede ir vacio'),

    body('price')
      .isNumeric().withMessage('Valor no valido')
      .notEmpty().withMessage('El precio del producto no puede ir vacio')
      .custom( value => value > 0 ).withMessage('Precio no valido'),
        handleInputErrors,
    createProduct
  
)

router.put('/:id',
    param('id').isInt().withMessage('ID no valido'), 
    body('name')
   .notEmpty().withMessage('El nombre del producto no puede ir vacio'),

    body('price')
      .isNumeric().withMessage('Valor no valido')
      .notEmpty().withMessage('El precio del producto no puede ir vacio')
      .custom( value => value > 0 ).withMessage('Precio no valido'),
        body('availability').isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleInputErrors,
    updateProduct)

router.patch('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability)

router.delete('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
)

export default router