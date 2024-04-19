// src/routes/products.ts
import express, { Request, Response } from 'express';
import Product, { IProduct } from '../models/Product';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products',});
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product',});
  }
});

router.get('/latest', async (req: Request, res: Response) => {
  try {
    const latestProducts = await Product.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json(latestProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching latest products',});
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error saving product',});
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const { favorite } = req.body;
    const updatedProductData = { favorite };
    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({message: 'Error updating product',});
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product',});
  }
});

export default router;
