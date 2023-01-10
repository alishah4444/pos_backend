const express = require('express');
const { GatherBulkProductData } = require('../controller/product');
const router = express();

router.get('/data', GatherBulkProductData);

module.exports = router;
