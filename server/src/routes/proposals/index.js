const express = require("express");
const router = express.Router();

const proposalController = require("../../controllers/proposals/index.js");
const multerMiddleware = require("../../middlewares/multer.middleware.js");

router.post("/crt", multerMiddleware.single("file"), proposalController.createProposals);
router.post("/crtdemo", multerMiddleware.single("file"), proposalController.createDemoproposal);
router.post("/get", proposalController.getProposals);
router.get("/getdemo", proposalController.getDemoProposals);
router.post("/update/:id", proposalController.updateProposal);
router.post("/updatebyhod/:id", proposalController.updateByHod);
router.post("/rejected/:id", proposalController.rejected);
router.post("/rejectedbyhod/:id", proposalController.rejectByHod);
// router.post("/get/single", proposalController.getSingleProposals);
// router.get("/getAll", blogController.getAll);
// router.get("/getSingle/:id", blogController.getSingleBlog);

module.exports = router;
