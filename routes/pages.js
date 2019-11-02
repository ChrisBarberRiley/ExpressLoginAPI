const express = require("express");
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
    .post(createSinglePage);

router
    .route("/:id")
    .get(getSinglePage)
    .delete(deleteSinglePage);

module.exports = router;
