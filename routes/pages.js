const express = require("express");

const { protect } = require("../middleware/auth");

const {
    getPages,
    getSinglePage,
    createSinglePage,
    deleteSinglePage
} = require("../controllers/pages");
const router = express.Router();

router
    .route("/")
    .get(getPages)
    .post(protect, createSinglePage);

router
    .route("/:id")
    .get(getSinglePage)
    .delete(protect, deleteSinglePage);

module.exports = router;
