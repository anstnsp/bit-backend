const router = require('express').Router(); 


router.get('/', (req,res)=> {
    res.json('exchange test')
})

module.exports = router;
