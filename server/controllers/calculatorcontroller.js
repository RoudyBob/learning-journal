let express = require('express');
let router = express.Router();

router.post('/add', function(req,res) {
    let number1 = req.body.num1;
    let number2 = req.body.num2;

    let total = { total: number1 + number2 };
    res.json(total);
});

module.exports = router;