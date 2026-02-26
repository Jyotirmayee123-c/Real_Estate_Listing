const express = require("express");
const {
    createProperty,
    getAllProperties,
    getSingleProperty,
    updateProperty,
    deleteProperty,
} = require("../controller/propertyController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

const upload = require("../middleware/upload");

router.post(
    "/",
    protect,
    adminOnly,
    upload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "images", maxCount: 10 },
    ]),
    createProperty
);

router.put(
    "/:id",
    protect,
    adminOnly,
    upload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "images", maxCount: 10 },
    ]),
    updateProperty
);
router.get("/", protect, adminOnly, getAllProperties);
router.get("/:id", protect, adminOnly, getSingleProperty);
router.delete("/:id", protect, adminOnly, deleteProperty);

module.exports = router;