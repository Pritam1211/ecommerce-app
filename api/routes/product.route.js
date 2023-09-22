const router = require("express").Router();
const formidable = require("express-formidable");
const { createProduct, updateProduct, getAllProduct, getSingleProduct, getProductPhoto, deleteProduct } = require("../controllers/product.controller");
const { adminMiddleware } = require("../middleware/auth.middleware");

router.post("/", adminMiddleware, formidable(), createProduct);
router.put("/:id", adminMiddleware, formidable(), updateProduct);
router.get("/", getAllProduct);
router.get("/:slug", getSingleProduct);
router.get("/photo/:id", getProductPhoto);
router.delete("/:id", deleteProduct);

module.exports = router;
