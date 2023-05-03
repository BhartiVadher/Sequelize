const express = require("express");
const app = express();
const router = express.Router();

const { pagination, studentData } = require("../controller/indexController");

router.get('/records',studentData);
router.get('/pagination',pagination);

module.exports= router;