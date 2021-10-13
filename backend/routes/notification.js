const express = require('express');
const router = express.Router();

router.get('/:link', (req, res) => {
    if(req.params.link==="test"){
        res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley");
    }
});

module.exports = router;
