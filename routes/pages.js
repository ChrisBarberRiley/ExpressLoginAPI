const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({ success: true, msg: "Show all pages" });
});

router.get("/:id", (req, res) => {
    res.status(200).json({
        success: true,
        msg: `Show specific page ${req.params.id}`
    });
});

module.exports = router;
