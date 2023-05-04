const express = require("express");
const app = express();
const router = express.Router();

const { insertData, selectData } = require("../controller/actorController.js");

router.post('/insertData', insertData);
router.get('/selectData', selectData);

module.exports = router;