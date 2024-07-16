import { Router } from "express";
import path from "node:path";
import { listCategories } from "./app/useCases/categories/listCategories";
import { createCategory } from "./app/useCases/categories/createCategory";
import { listProducts } from "./app/useCases/products/listProducts";
import { createProduct } from "./app/useCases/products/createProduct";
import multer from "multer";
import { listProductsByCategory } from "./app/useCases/products/listProductsByCategory";
import { listOrders } from "./app/useCases/orders/listOrders";
import { createOrder } from "./app/useCases/orders/createOrder";
import { changeOrderStatus } from "./app/useCases/orders/changeOrderStatus";
import { cancelOrder } from "./app/useCases/orders/cancelOrder";
import { deleteProduct } from "./app/useCases/products/deleteProduct";
import { updateProduct } from "./app/useCases/products/updateProduct";

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

router.get("/categories", listCategories);

router.post("/categories", createCategory);

router.get("/products", listProducts);

router.post("/products", upload.single("image"), createProduct);

router.patch("/products/:productId", upload.single("image"), updateProduct);

router.delete("/products/:productId", deleteProduct)

router.get("/categories/:categoryId/products", listProductsByCategory);

router.get("/orders", listOrders);

router.post("/orders", createOrder);

router.patch("/orders/:orderId", changeOrderStatus);

router.delete("/orders/:orderId", cancelOrder);
