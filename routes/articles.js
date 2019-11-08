const express = require("express");
const { listBlogs } = require("../controllers/articles");
const router = express.Router();

router.get("/list-blogs", listBlogs);

module.exports = router;
