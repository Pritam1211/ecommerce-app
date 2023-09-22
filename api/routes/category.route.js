const { getAllCategory, getSingleCategory, createCategory, updateCategory, deleteCategory } = require("../controllers/category.controller");
const { adminMiddleware } = require("../middleware/auth.middleware");

const router = require("express").Router();

router.get("/", getAllCategory);
router.get("/:slug", getSingleCategory);
router.post("/", adminMiddleware, createCategory);
router.put("/:id", adminMiddleware, updateCategory);
router.delete("/:id", adminMiddleware, deleteCategory);

module.exports = router;