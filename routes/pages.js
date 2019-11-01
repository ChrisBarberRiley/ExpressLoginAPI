const express = require("express");
const {
    getPages,
    getSinglePage,
    deleteSinglePage
} = require("../controllers/pages");
const router = express.Router();

router.route("/").get(getPages);

router
    .route("/:id")
    .get(getSinglePage)
    .delete(deleteSinglePage);

module.exports = router;
