const express = require("express");
const app = express();
const router = express.Router();

const {
  records,
  comboGenerate,
  dataDelete,
} = require("../controller/selectController");


router.get("/records", records);
router.post("/comboGenerate", comboGenerate);
router.get("/dataDelete", dataDelete);

module.exports = router;
