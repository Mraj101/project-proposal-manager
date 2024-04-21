const express = require("express");
const router = express.Router();

const proposalController = require("../../controllers/proposals/index.js");
const multerMiddleware = require("../../middlewares/multer.middleware.js");

router.post("/crt", multerMiddleware.single("file"), proposalController.createProposals);
router.get("/get", proposalController.getProposals);
router.get("/update/:id", proposalController.updateProposal);
// router.post("/get/single", proposalController.getSingleProposals)
// router.get("/getAll", blogController.getAll);
// router.get("/getSingle/:id", blogController.getSingleBlog);

module.exports = router;
