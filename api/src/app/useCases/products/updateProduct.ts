import { Request, Response } from "express";
import { Product } from "../../models/Product";

export async function updateProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    const imagePath = req.file?.filename;

    const updatedProduct = await Product.findByIdAndUpdate(productId ,{
      ...req.body,
      imagePath
    })

    console.log(req.body)

    res.status(201).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}
