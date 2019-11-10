const express = require("express");

const { protect } = require("../middleware/auth");

const {
    listArticles,
    createArticle,
    getArticle,
    updateArticle,
    removeArticle
} = require("../controllers/articles");
const router = express.Router();

router
    .route("/")
    .get(listArticles)
    .post(protect, createArticle);

router
    .route("/:id")
    .get(getArticle)
    .put(protect, updateArticle)
    .delete(protect, removeArticle);

module.exports = router;
